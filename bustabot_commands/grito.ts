import telegramCommands = require("../bot_core/telegram_commands");
import BotCommand from "../bot_core/bot_command";
import TelegramMessage from "../bot_core/telegram_request";

class Grito extends BotCommand {
    keys = ["grito"];
    description = "Grido";
    execute(key: string, params: string[], req: TelegramMessage, data: any): void {
        telegramCommands.sendMessage(
            key,
            req.message.chat.id,
            req.message.message_id,
            "Grito.");
    }
}

export default new Grito();