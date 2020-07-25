import telegramCommands = require("../../types/telegram_commands");
import BotCommand from "../../types/bot_command";
import TelegramBot = require("node-telegram-bot-api");

class Guess extends BotCommand {
    keys = ["guess"];
    description = "Guess";
    execute(key: string, params: string[], message: TelegramBot.Message, data: any): void {
        telegramCommands.sendMessage(
            key,
            message.chat.id,
            message.message_id,
            "Guess");
    }
}

export default new Guess();