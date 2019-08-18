const telegramCommands = require("../bot_core/telegram_commands");

module.exports = {
    keys: ["countdown", "cd"],
    help: "Contagem regressiva até 10 segundos.",
    execute: function (params, req) {
        if (params.length != 2) {
            telegramCommands.sendMessage(req.message.chat.id,
                "Número inválido de parâmetros. Tente:\n<code>/cd 3</code>");
            return;
        }
        let value = Math.max(Math.min(params[1], 10), 1);

        telegramCommands.sendMessage(req.message.chat.id, "Contagem Regressiva! " + value + "...");
        for (let i = 0; i < value; i++) {
            setTimeout(function () {
                telegramCommands.sendMessage(req.message.chat.id, i + i == 0 ? "!" : "...");
                console.log("Counting down: " + i);
            }, (value - i) * 1000);
        }
    }
}