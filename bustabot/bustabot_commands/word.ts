import telegramCommands = require("../../bot_core/Telegram/telegram_commands");
import BotCommand from "../../bot_core/Bot/bot_command";
import TelegramBot = require("node-telegram-bot-api");
import BotExecuteContext from "../../bot_core/Bot/bot_execute_data";
import { readFileSync } from 'fs';
import BotData from "../../bot_core/Bot/bot_data";

const wordCommandDocument = "word";

const wrongGuess: string = "⬛️";
const misplacedGuess: string = "🟨";
const rightGuess: string = "🟩";

const date0 = new Date(2022, 0, 9); // Jan is month 0
const dateOffset = 1;

function splitStringRemoveEmpty(s: string): string[] {
    return s.split(/\s+/).filter(function (i) { return i; });
}

const database = splitStringRemoveEmpty(readFileSync("./bustabot/word_data/database_ptbr_src.txt", { encoding: 'utf8', flag: 'r' }));
const wordList = splitStringRemoveEmpty(readFileSync("./bustabot/word_data/database_ptbr.txt", { encoding: 'utf8', flag: 'r' }));

function formatTime(value: number): string {
    return value.toString().padStart(2, '0');
}

class WordData extends BotData {
    lastSentMessage: number;
    dayIndex: number;
    guesses: string;
    players: string;
}

function toFirestore(data: WordData): FirebaseFirestore.DocumentData {
    return {
        lastSentMessage: data.lastSentMessage,
        dayIndex: data.dayIndex,
        players: data.players,
        guesses: data.guesses
    };
}

function ensureData(data: WordData) {
    if (!data.lastSentMessage) {
        data.lastSentMessage = null;
    }
    if (!data.dayIndex) {
        data.dayIndex = 0;
    }
    if (!data.players) {
        data.players = "";
    }
    if (!data.guesses) {
        data.guesses = "";
    }
}

function replaceCharAt(str: string, index: number, char: string): string {
    return str.substring(0, index) + char + str.substring(index + 1);
}

function resultStringFromGuess(word: string, guess: string): string {
    let charResult = "WWWWW";
    let missingCharacters: string[] = [];
    for (let i = 0; i < 5; i++) {
        if (word[i] === guess[i]) {
            charResult = replaceCharAt(charResult, i, "R");
        } else {
            missingCharacters.push(word[i]);
        }
    }

    for (let i = 0; i < 5; i++) {
        let index = missingCharacters.indexOf(guess[i]);
        if (charResult[i] != "R" && index > -1) {
            charResult = replaceCharAt(charResult, i, "M");
            missingCharacters.splice(index, 1)
        }
    }

    let result = "";
    for (let i = 0; i < 5; i++) {
        result += charResult[i] == "W" ? wrongGuess : charResult[i] == "M" ? misplacedGuess : rightGuess;
    }

    return result;
}

function getUsername(user: TelegramBot.User) {
    return user ? (user.username ? user.username : user.first_name) : "someone";
}

class Word extends BotCommand {
    keys = ["word"];
    description = "Adivinhe a palavra";
    execute = function (ctx: BotExecuteContext): void {
        let document = ctx.data.doc(`${wordCommandDocument}[${ctx.message.chat.id}]`)
        document.get()
            .then(doc => {
                function sendMessage(msg: string) {
                    telegramCommands.sendMessage(
                        ctx.botKey,
                        ctx.message.chat.id,
                        null,
                        msg,
                        function (res) {
                            if (data && data.lastSentMessage) {
                                telegramCommands.deleteMessage(ctx.botKey, ctx.message.chat.id, data.lastSentMessage)
                            }
                            data.lastSentMessage = res.message_id;
                            document.set(toFirestore(data));
                        }
                    );
                };

                const now = new Date(Date.now());
                const dateDiff = now.getTime() - date0.getTime();
                const todayIndex = Math.floor(dateDiff / (1000 * 3600 * 24)) + dateOffset;

                let data: WordData = doc.exists ? doc.data() as WordData : new WordData();

                if (todayIndex > data.dayIndex) {
                    data = new WordData();
                    data.dayIndex = todayIndex;
                }

                ensureData(data);

                const word = wordList[todayIndex];
                const normalizedWord = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
                let timeRemaining = endOfDay.getTime() - now.getTime();
                const remainingHours = Math.floor(timeRemaining / (1000 * 60 * 60));
                timeRemaining -= remainingHours * (1000 * 60 * 60);
                const remainingMinutes = Math.floor(timeRemaining / (1000 * 60))
                timeRemaining -= remainingMinutes * (1000 * 60);
                const remainingSeconds = Math.floor(timeRemaining / (1000))
                const statusString = `Dia <code>${todayIndex}</code>. Próxima palavra em: <code>${formatTime(remainingHours)}:${formatTime(remainingMinutes)}:${formatTime(remainingSeconds)}</code>`;

                const guessedWords = splitStringRemoveEmpty(data.guesses);
                const players = splitStringRemoveEmpty(data.players);
                const lastGuess = guessedWords.length > 0 ? guessedWords[guessedWords.length - 1] : "";

                function resultString(): string {
                    let r = "";
                    const size = Math.min(guessedWords.length, players.length);
                    for (var i = 0; i < size; i++) {
                        r = `<code>${guessedWords[i]}</code> ${resultStringFromGuess(word, guessedWords[i])} - ${players[i]}\n` + r;
                    }
                    return r;
                }

                function missingCharacters() {
                    let m = "Letras disponíveis:\n";
                    let mm = "";
                    let count = 0;
                    for (let i = "a".charCodeAt(0); i < "z".charCodeAt(0); i++) {
                        const c = String.fromCharCode(i);
                        if (!data.guesses.includes(c)) {
                            m += `${c} `;
                            count++;
                        } else if (word.includes(c)) {
                            mm += `<b>${c}</b> `;
                        }

                        if (count > 10) {
                            m += "\n";
                            count = 0;
                        }
                    }
                    return m + "\n" + mm;
                }

                function formatString(message: string): string {
                    return message + "\n" + resultString() + missingCharacters() + "\n" + statusString;
                }

                if (lastGuess == word) {
                    const lastPlayer = guessedWords.length > 0 && guessedWords.length <= players.length ? players[guessedWords.length - 1] : "";
                    sendMessage(formatString(`${lastPlayer} já adivinhou a palavra de hoje! A palavra é <code>${word}</code>!`));
                    return;
                }

                if (ctx.params.length < 2) {
                    sendMessage(formatString("<b>Mande</b> uma palavra válida de 5 letras."));
                    return;
                }

                const guess = ctx.message.text.substring(ctx.params[0].length, ctx.params[0].length + 20).trim().toLowerCase();
                const normalizedGuess = guess.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

                if (data.guesses.includes(normalizedGuess)) {
                    sendMessage(formatString("Palavra já enviada."))
                    return;
                }

                if (guess.length != 5) {
                    sendMessage(formatString("Mande uma palavra <b>válida</b> de 5 letras."));
                    return;
                }

                if (!database.includes(guess)) {
                    sendMessage(formatString("Mande uma palavra <b>válida</b> de 5 letras."));
                    return;
                }

                const result = resultStringFromGuess(normalizedWord, normalizedGuess);

                const userName = getUsername(ctx.message.from);

                data.guesses = data.guesses + " " + normalizedGuess;
                data.players = data.players + " " + userName;

                document.set(toFirestore(data));

                if (result == "🟩🟩🟩🟩🟩") {
                    sendMessage(formatString(`${userName} acertou! A palavra era <code>${word}</code>.\n` +
                        `<code>${word}</code> ${result} - ${userName}\n`));
                } else {
                    sendMessage(formatString(`<code>${guess}</code> ${result} - ${userName}`));
                }
            })
            .catch(err => {
                console.log("Error getting document", err);
            });
    }
}

export default new Word();