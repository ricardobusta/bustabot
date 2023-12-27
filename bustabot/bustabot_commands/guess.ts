import telegramCommands = require("../../bot_core/Telegram/telegram_commands");
import BotCommand from "../../bot_core/Bot/bot_command";
import BotExecuteContext from "../../bot_core/Bot/bot_execute_data";

class Guess extends BotCommand {
    keys: string[] = ["guess"];
    description: string = "Guess";
    execute: (ctx: BotExecuteContext) => void = function (ctx: BotExecuteContext): void {
        telegramCommands.sendMessage(
            ctx.botKey,
            ctx.message.chat.id,
            ctx.message.message_id,
            "Guess");
    }
}

export default new Guess();