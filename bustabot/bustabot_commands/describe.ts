import telegramCommands = require("../../bot_core/Telegram/telegram_commands");
import BotCommand from "../../bot_core/Bot/bot_command";
import TelegramBot = require("node-telegram-bot-api");

class Describe extends BotCommand {
    keys = ["desc", "descreve"];
    description = "Descreve uma imagem";
    execute(key: string, params: string[], message: TelegramBot.Message, _data: any): void {
        telegramCommands.sendMessage(
            key,
            message.chat.id,
            message.message_id,
            "interp");
    }
}

export default new Describe();