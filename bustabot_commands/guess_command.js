const telegramCommands = require("../bot_core/telegram_commands");

module.exports = {
    keys: ["guess"],
    help: "Guess",
    execute: function (key, params, req) {
        telegramCommands.sendMessage(
            key, 
            req.message.chat.id,
            "Guess");
    }
}