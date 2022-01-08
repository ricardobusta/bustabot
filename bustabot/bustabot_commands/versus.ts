import telegramCommands = require("../../bot_core/Telegram/telegram_commands");
import BotCommand from "../../bot_core/Bot/bot_command";
import TelegramBot = require("node-telegram-bot-api");
import BotExecuteContext from "../../bot_core/Bot/bot_execute_data";

class Versus extends BotCommand {
    keys = ["versus", "vs"];
    description = "Versus";
    execute = function (ctx: BotExecuteContext): void {
        let text = "";
        if (ctx.params.length <= 2) {
            text = "Número de parâmetros insuficiente. Precisa de pelo menos dois.\n" +
                "/vs valor_um valor_dois .. valor_ultimo";
            console.log("Invalid");
        } else {
            let value = Math.floor(Math.random() * (ctx.params.length - 1)) + 1;
            console.log("Selected value: " + value);
            text = `O vencedor é: <code>${ctx.params[value]}</code>!`;
        }

        telegramCommands.sendMessage(
            ctx.botKey,
            ctx.message.chat.id,
            ctx.message.message_id,
            text
        );
    }
}

export default new Versus();