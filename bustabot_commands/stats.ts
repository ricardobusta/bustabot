import telegramCommands = require("../bot_core/telegram_commands");
import BotCommand from "../bot_core/bot_command";
import TelegramRequest from "../bot_core/telegram_request";

class Stats extends BotCommand {
    keys = ["stats"];
    description = "Estatísticas do bot";
    execute(key: string, _params: string[], req: TelegramRequest, _data: any): void {
        telegramCommands.sendMessage(
            key,
            req.message.chat.id,
            req.message.message_id,
            "Stats.");
    }

}

export default new Stats();