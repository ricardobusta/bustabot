import telegramCommands = require("../../bot_core/Telegram/telegram_commands");
import BotCommand from "../../bot_core/Bot/bot_command";
import TelegramBot = require("node-telegram-bot-api");

function RandomRange(min, max) {
    return Math.floor((Math.random() * (max - min + 1) + min));
}

class Moo extends BotCommand {
    keys = ["moo", "muu"];
    description = "Moos";
    execute = function (_commandKey: string, botKey: string, _params: string[], message: TelegramBot.Message, _data: any): void {
        var cowChance = RandomRange(1, 20);
        let text: string;
        if (cowChance < 3) {
            let value = RandomRange(1, 10);
            text = "M";
            for (let i = 0; i < value; i++) {
                text += "o";
            }
            text += " 🐮";
        } else if (cowChance < 5) {
            let value = RandomRange(1, 10);
            text = "B";
            for (let i = 0; i < value; i++) {
                text += "a";
            }
            text += "h";
        } else if (cowChance < 6) {
            text = "Meow meow i'm a cow!";
        } else {
            let value = RandomRange(1, 10);
            text = "M";

            for (let i = 0; i < value; i++) {
                text += "o";
            }
        }

        telegramCommands.sendMessage(
            botKey,
            message.chat.id,
            null,
            text);
    }
}

export default new Moo();