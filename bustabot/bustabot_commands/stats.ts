import telegramCommands = require("../../bot_core/Telegram/telegram_commands");
import BotCommand from "../../bot_core/Bot/bot_command";
import TelegramBot = require("node-telegram-bot-api");
import BotExecuteContext from "../../bot_core/Bot/bot_execute_data";

class Stats extends BotCommand {
    keys = ["stats"];
    description = "Estatísticas do bot";
    execute = function (ctx: BotExecuteContext): void {
        telegramCommands.sendMessage(
            ctx.botKey,
            ctx.message.chat.id,
            ctx.message.message_id,
            "Stats."
        );
    }

}

export default new Stats();