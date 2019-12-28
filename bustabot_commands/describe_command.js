const telegramCommands = require("../bot_core/telegram_commands");

module.exports = {
    keys: ["desc", "descreve"],
    description: "Descreve uma imagem",
    wip: true,
    execute: function (key, params, req) {
        telegramCommands.sendMessage(
            key,
            req.message.chat.id,
            req.message.message_id,
            "interp");
    }
}