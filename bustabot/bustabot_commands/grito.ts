import telegramCommands = require("../../bot_core/Telegram/telegram_commands");
import BotCommand from "../../bot_core/Bot/bot_command";
import TelegramBot = require("node-telegram-bot-api");

class Grito extends BotCommand {
    keys = ["grito", "shout"];
    description = "Shout a phrase";
    execute = function (_commandKey: string, botKey: string, params: string[], message: TelegramBot.Message, _data: any): void {
        if (params.length < 2) {
            telegramCommands.sendMessage(
                botKey,
                message.chat.id,
                message.message_id,
                "Shout something.");
            return;
        }

        let msg = message.text.substring(params[0].length, params[0].length + 20).trim().toUpperCase();

        let text = "<code>" + msg.split('').join(' ');

        for (let i = 1; i < msg.length; i++) {
            text += "\n" + msg[i] + " ".repeat(i * 2 - 1) + msg[i];
        }

        text += "</code>"

        telegramCommands.sendMessage(
            botKey,
            message.chat.id,
            message.message_id,
            text);
    }
}

export default new Grito();