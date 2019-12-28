const telegramCommands = require("../bot_core/telegram_commands");

module.exports = {
    keys: ["resetar"],
    description: "Resetar (possivelmente pedindo uma confirmação?)",
    execute: function (key, params, req) {
        telegramCommands.sendMessage(
            key,
            req.message.chat.id,
            "Resetar.");
    }
}