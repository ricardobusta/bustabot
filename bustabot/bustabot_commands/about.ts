import BotCommand from "../../bot_core/Bot/bot_command";
import BotExecuteContext from "../../bot_core/Bot/bot_execute_data";
import telegramCommands = require("../../bot_core/Telegram/telegram_commands");

class About extends BotCommand {
    keys = ["about"];
    description = "About @BustaBot";
    execute = function (ctx: BotExecuteContext): void {
        telegramCommands.sendMessage(
            ctx.botKey,
            ctx.message.chat.id,
            ctx.message.message_id,
            "BustaBot version 1.0 - Build #N\nMade by Ricardo Bustamante <ricardo@busta.dev>\nhttps://github.com/ricardobusta/bustabot"
        );
    }
}

export default new About();