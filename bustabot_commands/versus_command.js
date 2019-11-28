const telegramCommands = require("../bot_core/telegram_commands");

module.exports = {
    keys: ["versus", "vs"],
    description: "Versus",
    execute: function (key, params, req) {
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