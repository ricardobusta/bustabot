import telegramCommands = require("../../bot_core/Telegram/telegram_commands");
import BotCommand from "../../bot_core/Bot/bot_command";
import TelegramBot = require("node-telegram-bot-api");

class Versus extends BotCommand {
    keys = ["versus", "vs"];
    description = "Versus";
    execute = function (_commandKey: string, botKey: string, params: string[], message: TelegramBot.Message, _data: any): void {
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
            botKey,
            message.chat.id,
            message.message_id,
            text
        );
    }
}

export default new Versus();