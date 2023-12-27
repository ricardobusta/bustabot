import telegramCommands = require("../../bot_core/Telegram/telegram_commands");
import BotCommand from "../../bot_core/Bot/bot_command";
import BotExecuteContext from "../../bot_core/Bot/bot_execute_data";

class Describe extends BotCommand {
    keys: string[] = ["desc", "descreve"];
    description: string = "Descreve uma imagem";
    execute: (ctx: BotExecuteContext) => void = function (ctx: BotExecuteContext): void {
        telegramCommands.sendMessage(
            ctx.botKey,
            ctx.message.chat.id,
            ctx.message.message_id,
            "interp");
    }
}

export default new Describe();