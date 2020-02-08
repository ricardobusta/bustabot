import telegramCommands = require("../../bot_core/Telegram/telegram_commands");
import BotCommand from "../../bot_core/bot_command";
import TelegramMessage from "../../bot_core/Telegram/telegram_message";

class Stats extends BotCommand {
    keys = ["stats"];
    description = "Estatísticas do bot";
    execute(key: string, _params: string[], req: TelegramMessage, _data: any): void {
        telegramCommands.sendMessage(
            key,
            req.message.chat.id,
            req.message.message_id,
            "Stats.");
    }

}

export default new Stats();