const telegramCommands = require('../bot_core/telegram_commands');

module.exports = {
    key: "grito",
    help: "Grido",
    execute: function(params, req){
        telegramCommands.sendMessage(
            req.message.chat.id,
            "Grito.");
    }
}