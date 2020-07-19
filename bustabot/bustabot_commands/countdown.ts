import telegramCommands = require("../../bot_core/Telegram/telegram_commands");
import BotCommand from "../../bot_core/Bot/bot_command";
import TelegramBot = require("node-telegram-bot-api");

class Countdown extends BotCommand {
    keys = ["countdown", "cd"];
    description = "Contagem regressiva até 10 segundos.";
    execute(key: string, params: string[], message: TelegramBot.Message, data: any): void {
        if (params.length != 2) {
            telegramCommands.sendMessage(key, message.chat.id, message.message_id,
                "Número inválido de parâmetros. Tente:\n<code>/cd 3</code>");
            return;
        }
        let value = Math.max(Math.min(+params[1], 10), 1);

        telegramCommands.sendMessage(key, message.chat.id, message.message_id, "Contagem Regressiva! " + value + "...");
        for (let i = 0; i < value; i++) {
            setTimeout(function () {
                telegramCommands.sendMessage(key, message.chat.id, null, i + (i == 0 ? "!" : "..."));
                console.log("Counting down: " + i);
            }, (value - i) * 1000);
        }
    }

}

export default new Countdown();