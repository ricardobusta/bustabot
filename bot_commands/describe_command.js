const telegramCommands = require("../bot_core/telegram_commands");

module.exports = {
    keys: ["desc", "descreve"],
    description: "Descreve uma imagem",
    wip: true,
    execute: function (params, req) {
        telegramCommands.sendMessage(
            req.message.chat.id,
            "interp");
    }
}