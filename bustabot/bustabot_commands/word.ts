import telegramCommands = require("../../bot_core/Telegram/telegram_commands");
import BotCommand from "../../bot_core/Bot/bot_command";
import TelegramBot = require("node-telegram-bot-api");
import BotExecuteContext from "../../bot_core/Bot/bot_execute_data";

const wrongGuess: string = "⬛️";
const misplacedGuess: string = "🟨";
const rightGuess: string = "🟩";

const date0 = new Date(2022, 0, 9); // Jan is month 0

import { readFileSync } from 'fs';
const databaseFile = readFileSync("./bustabot/word_data/database_ptbr_rand.txt", { encoding: 'utf8', flag: 'r' });
const database = databaseFile.split(/\s+/);

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

        let word = database[index];

        let result = "";
        for (let i = 0; i < 5; i++) {
            if (word[i] === guess[i]) {
                result += rightGuess;
            } else if (word.includes(guess[i])) {
                result += misplacedGuess;
            } else {
                result += wrongGuess;
            }
        }

        telegramCommands.sendMessage(
            ctx.botKey,
            ctx.message.chat.id,
            ctx.message.message_id,
            `${index}: ${result}`
        );
    }
}

export default new Word();