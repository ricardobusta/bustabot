import telegramCommands = require("../../types/telegram_commands");
import BotCommand from "../../types/bot_command";
import TelegramBot = require("node-telegram-bot-api");

class Versus extends BotCommand {
    keys = ["versus", "vs"];
    description = "Versus";
    execute(key: string, params: string[], message: TelegramBot.Message, _data: any): void {
        let text = "";
        if (params.length <= 2) {
            text = "Número de parâmetros insuficiente. Precisa de pelo menos dois.\n" +
                "/vs valor_um valor_dois .. valor_ultimo";
            console.log("Invalid");
        } else {
            let value = Math.floor(Math.random() * (params.length - 1)) + 1;
            console.log("Selected value: " + value);
            text = `O vencedor é: <code>${params[value]}</code>!`;
        }

        telegramCommands.sendMessage(
            key,
            message.chat.id,
            message.message_id,
            text
        );
    }
}

export default new Versus();