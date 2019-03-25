const telegramCommands = require('../bot_core/telegram_commands');

module.exports = {
    key: "versus",
    alias: ["vs"],
    help: "Versus",
    execute: function(params, req){
        telegramCommands.sendMessage(
            req.message.chat.id,
            "Versus");
    }
}