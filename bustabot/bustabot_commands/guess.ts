import telegramCommands = require("../../bot_core/Telegram/telegram_commands");
import BotCommand from "../../bot_core/Bot/bot_command";
import TelegramBot = require("node-telegram-bot-api");

class Guess extends BotCommand {
    keys = ["guess"];
    description = "Guess";
    execute(key: string, _params: string[], message: TelegramBot.Message, _data: any): void {
        telegramCommands.sendMessage(
            key,
            message.chat.id,
            message.message_id,
            "Guess");
    }
}

export default new Guess();