import telegramCommands = require("../bot_core/telegram_commands");
import BotCommand from "../bot_core/bot_command";
import TelegramMessage from "../bot_core/telegram_request";

class Countdown extends BotCommand {
    keys = ["countdown", "cd"];
    description = "Contagem regressiva até 10 segundos.";
    execute(key: string, params: string[], req: TelegramMessage, data: any): void {
        if (params.length != 2) {
            telegramCommands.sendMessage(key, req.message.chat.id, req.message.message_id,
                "Número inválido de parâmetros. Tente:\n<code>/cd 3</code>");
            return;
        }
        let value = Math.max(Math.min(+params[1], 10), 1);

        telegramCommands.sendMessage(key, req.message.chat.id, req.message.message_id, "Contagem Regressiva! " + value + "...");
        for (let i = 0; i < value; i++) {
            setTimeout(function () {
                telegramCommands.sendMessage(key, req.message.chat.id, null, i + (i == 0 ? "!" : "..."));
                console.log("Counting down: " + i);
            }, (value - i) * 1000);
        }
    }

}

export default new Countdown();