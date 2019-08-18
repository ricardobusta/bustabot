const telegramCommands = require('../bot_core/telegram_commands');

module.exports = {
    keys: ["versus", "vs"],
    description: "Versus",
    execute: function (params, req) {
        let message = "";
        if (params.length <= 2) {
            message = "Número de parâmetros insuficiente.\n" +
                "/vs ";
            console.log("Invalid");
        } else {
            let value = Math.floor(Math.random() * (params.length - 1)) + 1;
            console.log("Selected value: " + value);
            message = "O vencedor é: <code>" + params[value] + "</code>!";
        }

        telegramCommands.sendMessage(
            req.message.chat.id,
            message);
    }
}