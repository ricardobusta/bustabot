import telegramCommands = require("../../bot_core/telegram_commands");
import BotCommand from "../../bot_core/bot_command";
import TelegramMessage from "../../bot_core/telegram_request";

class Versus extends BotCommand {
    keys = ["versus", "vs"];
    description = "Versus";
    execute(key: string, params: string[], req: TelegramMessage, _data: any): void {
        let message = "";
        if (params.length <= 2) {
            message = "Número de parâmetros insuficiente. Precisa de pelo menos dois.\n" +
                "/vs valor_um valor_dois .. valor_ultimo";
            console.log("Invalid");
        } else {
            let value = Math.floor(Math.random() * (params.length - 1)) + 1;
            console.log("Selected value: " + value);
            message = "O vencedor é: <code>" + params[value] + "</code>!";
        }

        telegramCommands.sendMessage(
            key,
            req.message.chat.id,
            req.message.message_id,
            message);
    }
}

export default new Versus();