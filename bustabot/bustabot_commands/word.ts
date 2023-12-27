import BotCommand from "../../bot_core/Bot/bot_command";
import TelegramBot = require("node-telegram-bot-api");
import BotExecuteContext from "../../bot_core/Bot/bot_execute_data";
import {readFileSync} from 'fs';
import BotData from "../../bot_core/Bot/bot_data";

const wordCommandDocument: string = "word";

const wrongGuess: string = "⬛️";
const misplacedGuess: string = "🟨";
const rightGuess: string = "🟩";

const date0: Date = new Date(2022, 0, 9); // Jan is month 0
const dateOffset: number = 1;

function splitStringRemoveEmpty(s: string, splitter: RegExp | string): string[] {
    return s.split(splitter).map(function (i: string): string {
        return i.trim();
    }).filter(function (i: string): string {
        return i;
    });
}

const vocabulary: string[] = splitStringRemoveEmpty(readFileSync("./bustabot/word_data/vocabulary_ptbr.txt", {
    encoding: 'utf8',
    flag: 'r'
}), /\s+/);
const wordOfDayList: string[] = splitStringRemoveEmpty(readFileSync("./bustabot/word_data/word_of_day_ptbr.txt", {
    encoding: 'utf8',
    flag: 'r'
}), /\s+/);

function formatTime(value: number): string {
    return value.toString().padStart(2, '0');
}

class WordData extends BotData {
    lastSentMessage: number;
    dayIndex: number;
    guesses: string;
    players: string;
    wordOverride: string;
}

function normalizeString(s: string): string {
    return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function toFirestore(data: WordData): FirebaseFirestore.DocumentData {
    return {
        lastSentMessage: data.lastSentMessage,
        dayIndex: data.dayIndex,
        players: data.players,
        guesses: data.guesses,
        wordOverride: data.wordOverride
    };
}

function ensureData(data: WordData): void {
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
    if (!data.wordOverride) {
        data.wordOverride = "";
    }
}

function replaceCharAt(str: string, index: number, char: string): string {
    return str.substring(0, index) + char + str.substring(index + 1);
}

function resultStringFromGuess(word: string, guess: string): string {
    let charResult: string = "WWWWW";
    let missingCharacters: string[] = [];
    for (let i = 0; i < 5; i++) {
        if (word[i] === guess[i]) {
            charResult = replaceCharAt(charResult, i, "R");
        } else {
            missingCharacters.push(word[i]);
        }
    }

    for (let i = 0; i < 5; i++) {
        let index: number = missingCharacters.indexOf(guess[i]);
        if (charResult[i] != "R" && index > -1) {
            charResult = replaceCharAt(charResult, i, "M");
            missingCharacters.splice(index, 1)
        }
    }

    let result: string = "";
    for (let i = 0; i < 5; i++) {
        result += charResult[i] == "W" ? wrongGuess : charResult[i] == "M" ? misplacedGuess : rightGuess;
    }

    return result;
}

function getUsername(user: TelegramBot.User): string {
    let username: string = user ? (user.username ? user.username : user.first_name) : "someone";
    return username.replace(",", ".");
}

function dataCleanup(data: FirebaseFirestore.CollectionReference<BotData>, todayIndex: number): void {
    console.log("Cleaning up data");

    data.listDocuments().then((docs): void => {
        docs.forEach((doc): void => {
            if (doc.id.startsWith(wordCommandDocument)) {
                doc.get()
                    .then((docData): void => {
                        let d: WordData = docData.exists ? docData.data() as WordData : null;
                        if (d && todayIndex > d.dayIndex) {
                            console.log(`Deleting old doc ${doc.id}\n`);
                            doc.delete().then((r): void => {
                            });
                        }
                    });
            }
        })
    });
}

class Word extends BotCommand {
    keys: string[] = ["word", "wor", "wo", "w"];
    description: string = "Adivinhe a palavra";
    execute: (ctx: BotExecuteContext) => void = function (ctx: BotExecuteContext): void {
        const now: Date = new Date(Date.now());
        const dateDiff: number = now.getTime() - date0.getTime();
        const todayIndex: number = Math.floor(dateDiff / (1000 * 3600 * 24)) + dateOffset;

        let document: FirebaseFirestore.DocumentReference<BotData> = ctx.data.doc(`${wordCommandDocument}[${ctx.message.chat.id}]`)
        document.get()
            .then((doc): void => {
                let data: WordData = doc.exists ? doc.data() as WordData : new WordData();

                if (todayIndex > data.dayIndex) {
                    data = new WordData();
                    data.dayIndex = todayIndex;
                    data.lastSentMessage = null;
                    data.wordOverride = "";
                }

                function sendMessage(msg: string, parseMode: string = "HTML"): void {
                    let telegram = this.telegram;
                    telegram.SendMessage(
                        ctx.botKey,
                        ctx.message.chat.id,
                        null,
                        msg,
                        function (res: TelegramBot.Message): void {
                            if (data?.lastSentMessage) {
                                telegram.DeleteMessage(ctx.botKey, ctx.message.chat.id, data.lastSentMessage)
                            }
                            data.lastSentMessage = res.message_id;
                            document.set(toFirestore(data)).then((r): void => {
                            });
                        },
                        parseMode
                    );
                };

                ensureData(data);

                let wordOfDay: string = wordOfDayList[todayIndex].toUpperCase();
                if (data.wordOverride && data.wordOverride != "") {
                    wordOfDay = data.wordOverride.trim().toUpperCase();
                }
                const normalizedWordOfDay: string = normalizeString(wordOfDay);
                const endOfDay: Date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
                let timeRemaining: number = endOfDay.getTime() - now.getTime();
                const remainingHours: number = Math.floor(timeRemaining / (1000 * 60 * 60));
                timeRemaining -= remainingHours * (1000 * 60 * 60);
                const remainingMinutes: number = Math.floor(timeRemaining / (1000 * 60))
                timeRemaining -= remainingMinutes * (1000 * 60);
                const remainingSeconds: number = Math.floor(timeRemaining / (1000))
                const statusString: string = `Próxima palavra em: <code>${formatTime(remainingHours)}:${formatTime(remainingMinutes)}:${formatTime(remainingSeconds)}</code>`;

                const guessedWords: string[] = splitStringRemoveEmpty(data.guesses.toUpperCase(), ",");
                const normalizedGuessedWords: string[] = guessedWords.map((w): string => normalizeString(w));
                const players: string[] = splitStringRemoveEmpty(data.players, ",");
                const lastGuess: string = guessedWords.length > 0 ? guessedWords[guessedWords.length - 1] : "";

                function resultString(): string {
                    let r: string = data.wordOverride != "" ? `@bustabot /word <code>Custom</code>\n` : `@bustabot /word #${todayIndex}\n`;
                    const size: number = Math.min(guessedWords.length, players.length);
                    for (var i = 0; i < size; i++) {
                        r = r + `<code>${guessedWords[i]}</code> ${resultStringFromGuess(normalizedWordOfDay, normalizedGuessedWords[i])} - ${players[i]}\n`;
                    }
                    return r;
                }

                function missingCharacters(): string {
                    let m: string = "";
                    let mm: string = "";
                    let count: number = 0;
                    for (let i = "A".charCodeAt(0); i <= "Z".charCodeAt(0); i++) {
                        const c: string = String.fromCharCode(i);
                        if (!normalizeString(data.guesses).includes(c)) {
                            m += `${c} `;
                            count++;
                        } else if (normalizedWordOfDay.includes(c)) {
                            mm += `[${c}] `;
                        }

                        if (count >= 10) {
                            m += "\n";
                            count = 0;
                        }
                    }
                    return `Letras disponíveis:\n<code>${mm.trim()}\n${m.trim()}</code>`;
                }

                function formatString(message: string, afterResult: string = ""): string {
                    return message + "\n" + resultString() + afterResult + missingCharacters() + "\n" + statusString;
                }

                if (ctx.params.length >= 2 && ctx.params[1].startsWith("-")) {
                    switch (ctx.params[1]) {
                        case "-cleanup":
                            dataCleanup(ctx.data, todayIndex);
                            sendMessage("Cleaning up old bot data.");
                            return;
                        case "-share":
                            let msg: string = `t.me/bustabot /word #${todayIndex}\n`;
                            const size: number = Math.min(guessedWords.length, players.length);
                            for (var i = 0; i < size; i++) {
                                msg += `${resultStringFromGuess(normalizedWordOfDay, normalizedGuessedWords[i])} - ${players[i]}\n`;
                            }
                            sendMessage(msg);
                            return;
                        case "-spoiler":
                            var index: number = todayIndex;
                            if (ctx.params.length >= 3) {
                                index = parseInt(ctx.params[2]);
                            }
                            const spoilerWord: string = wordOfDayList[index];
                            sendMessage(`Spoiler: <tg-spoiler>${spoilerWord}</tg-spoiler>`);
                            return;
                        case "-set":
                            if (ctx.params.length < 3) {
                                sendMessage(`Envie uma palavra`);
                                return;
                            }
                            if (normalizeString(lastGuess) != normalizedWordOfDay) {
                                sendMessage(`Ultima palavra não foi adivinhada ainda!`);
                                return;
                            }
                            const input: string = ctx.params[2].trim();
                            if (input.length != 5) {
                                sendMessage(`A palavra precisa ter 5 caracteres!`);
                                return;
                            }
                            const normalizedInput: string = normalizeString(input);
                            if (normalizedInput.match(new RegExp("[a-zA-Z]{5}")) == null) {
                                sendMessage(`A palavra deve conter apenas letras.`);
                                return;
                            }
                            data.wordOverride = input;
                            data.guesses = "";
                            data.players = "";
                            data.lastSentMessage = null;
                            sendMessage(`Word set by ${getUsername(ctx.message.from)}`)
                            return;
                    }
                }

                if (lastGuess == wordOfDay) {
                    const lastPlayer: string = guessedWords.length > 0 && guessedWords.length <= players.length ? players[guessedWords.length - 1] : "";
                    sendMessage(formatString(`${lastPlayer} já adivinhou a palavra de hoje! A palavra é <code>${wordOfDay}</code>!\nUse <code>/word -share</code> para compartilhar.\n`));
                    return;
                }

                if (ctx.params.length < 2) {
                    sendMessage(formatString("<b>Mande</b> uma palavra válida de 5 letras.\n"));
                    return;
                }

                const playerGuess: string = ctx.message.text.substring(ctx.params[0].length, ctx.params[0].length + 20).trim().toUpperCase();
                const normalizedGuess: string = normalizeString(playerGuess);

                if (normalizedGuessedWords.includes(normalizedGuess)) {
                    sendMessage(formatString("Palavra já enviada.\n"))
                    return;
                }

                if (normalizedGuess.length != 5) {
                    sendMessage(formatString("Mande uma palavra <b>válida</b> de 5 letras.\n"));
                    return;
                }

                if (!vocabulary.includes(playerGuess) && !wordOfDayList.includes(playerGuess) && normalizedGuess != normalizedWordOfDay) {
                    sendMessage(formatString("Mande uma palavra <b>válida</b> de 5 letras.\n"));
                    return;
                }

                const result: string = resultStringFromGuess(normalizedWordOfDay, normalizedGuess);

                const userName: string = getUsername(ctx.message.from);

                data.guesses = data.guesses.toUpperCase() + "," + playerGuess;
                data.players = data.players + "," + userName;

                document.set(toFirestore(data)).then((r): void => {
                });

                if (result == "🟩🟩🟩🟩🟩") {
                    sendMessage(formatString(`${userName} acertou! A palavra era <code>${wordOfDay}</code>.\n`,
                        `<code>${wordOfDay}</code> ${result} - ${userName}\nUse <code>/word -share</code> para compartilhar.\n`));
                } else {
                    sendMessage(formatString("", `<code>${playerGuess}</code> ${result} - ${userName}\n`));
                }
            })
            .catch((err): void => {
                console.log("Error getting document", err);
            });
    }
}

export default new Word();