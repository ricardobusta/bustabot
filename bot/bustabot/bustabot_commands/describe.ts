import telegramCommands = require("../../types/telegram_commands");
import BotCommand from "../../types/bot_command";
import TelegramBot = require("node-telegram-bot-api");

class Describe extends BotCommand {
    keys = ["desc", "descreve"];
    description = "Descreve uma imagem";
    execute(key: string, params: string[], message: TelegramBot.Message, data: any): void {
        telegramCommands.sendMessage(
            key,
            message.chat.id,
            message.message_id,
            "interp");
    }
}

export default new Describe();