const telegramCommands = require("../bot_core/telegram_commands");

module.exports = {
    keys: ["pular"],
    description: "Pular (também com confirmação)",
    execute: function (key, params, req) {
        telegramCommands.sendMessage(
            key,
            req.message.chat.id,
            "Pular.");
    }
}