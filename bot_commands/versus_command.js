const telegramCommands = require('../bot_core/telegram_commands');

module.exports = {
    keys: ["versus", "vs"],
    description: "Versus",
    execute: function(params, req){
        telegramCommands.sendMessage(
            req.message.chat.id,
            "Versus");
    }
}