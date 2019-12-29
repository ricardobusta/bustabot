import telegramCommands = require("../bot_core/telegram_commands");
import BotCommand from "../bot_core/bot_command";
import TelegramRequest from "../bot_core/telegram_request";

class Describe extends BotCommand {
    keys = ["desc", "descreve"];
    description = "Descreve uma imagem";
    execute(key: string, params: string[], req: TelegramRequest, data: any): void {
        telegramCommands.sendMessage(
            key,
            req.message.chat.id,
            req.message.message_id,
            "interp");
    }
}

export default new Describe();