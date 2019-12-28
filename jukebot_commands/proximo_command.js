const telegramCommands = require("../bot_core/telegram_commands");

module.exports = {
    keys: ["proximo"],
    description: "Próximo @proximo",
    execute: function (key, params, req) {
        telegramCommands.sendMessage(
            key,
            req.message.chat.id,
            "Próximo.");
    }
}