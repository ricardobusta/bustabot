import telegramCommands = require("../../bot_core/Telegram/telegram_commands");
import BotCommand from "../../bot_core/Bot/bot_command";
import TelegramBot = require("node-telegram-bot-api");
import BotExecuteContext from "../../bot_core/Bot/bot_execute_data";

const wrongChar: string = "⬛️";
const misplacedChar: string = "🟨";
const existingChar: string = "🟩";

class Word extends BotCommand {
    keys = ["word"];
    description = "Estatísticas do bot";
    execute = function (ctx: BotExecuteContext): void {
        if (!this.HaveMinParamAmount(ctx, 1, "Mande um chute. Uma palavra de 5 letras.")) {
            return;
        }

        let guess = ctx.message.text.substring(ctx.params[0].length, ctx.params[0].length + 20).trim().toUpperCase();

        telegramCommands.sendMessage(
            ctx.botKey,
            ctx.message.chat.id,
            ctx.message.message_id,
            guess
        );
    }
}

export default new Word();