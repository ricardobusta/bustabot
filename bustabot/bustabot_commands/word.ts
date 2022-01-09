import telegramCommands = require("../../bot_core/Telegram/telegram_commands");
import BotCommand from "../../bot_core/Bot/bot_command";
import TelegramBot = require("node-telegram-bot-api");
import BotExecuteContext from "../../bot_core/Bot/bot_execute_data";

const wrongGuess: string = "⬛️";
const misplacedGuess: string = "🟨";
const rightGuess: string = "🟩";

const date0 = new Date(2022, 0, 9); // Jan is month 0

import { readFileSync } from 'fs';
const database = readFileSync("./bustabot/word_data/database_ptbr_src.txt", { encoding: 'utf8', flag: 'r' }).split(/\s+/);
const wordList = readFileSync("./bustabot/word_data/database_ptbr.txt", { encoding: 'utf8', flag: 'r' }).split(/\s+/);

class Word extends BotCommand {
    keys = ["word"];
    description = "Adivinhe a palavra";
    execute = function (ctx: BotExecuteContext): void {
        function sendMessage(msg: string) {
            telegramCommands.sendMessage(
                ctx.botKey,
                ctx.message.chat.id,
                ctx.message.message_id,
                msg
            );
        };

        if (ctx.params.length < 2) {
            sendMessage("Mande um chute. Uma palavra de 5 letras.");
            return;
        }

        let guess = ctx.message.text.substring(ctx.params[0].length, ctx.params[0].length + 20).trim().toLowerCase();
        let normalizedGuess = guess.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        if (guess.length != 5) {
            sendMessage("Mande uma palavra de 5 letras.");
            return;
        }

        if (!database.includes(guess)) {
            sendMessage("Mande uma palavra de 5 letras válida.");
            return;
        }

        let dateDiff = new Date().getTime() - date0.getTime();
        let index = Math.floor(dateDiff / (1000 * 3600 * 24));

        let word = wordList[index];
        let normalizedWord = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        let result = "";
        for (let i = 0; i < 5; i++) {
            if (normalizedWord[i] === normalizedGuess[i]) {
                result += rightGuess;
            } else if (word.includes(normalizedGuess[i])) {
                result += misplacedGuess;
            } else {
                result += wrongGuess;
            }
        }

        var actualTime = new Date(Date.now());
        var endOfDay = new Date(actualTime.getFullYear(), actualTime.getMonth(), actualTime.getDate() + 1, 0, 0, 0);
        var timeRemaining = endOfDay.getTime() - actualTime.getTime();
        var remainingHours = Math.floor(timeRemaining / (1000 * 60 * 60));
        timeRemaining -= remainingHours * (1000 * 60 * 60);
        var remainingMinutes = Math.floor(timeRemaining / (1000 * 60))
        timeRemaining -= remainingMinutes * (1000 * 60);
        var remainingSeconds = Math.floor(timeRemaining / (1000))

        telegramCommands.sendMessage(
            ctx.botKey,
            ctx.message.chat.id,
            ctx.message.message_id,
            `Dia ${index}: ${result}\nTempo restante: ${remainingHours}:${remainingMinutes}:${remainingSeconds}`
        );
    }
}

export default new Word();