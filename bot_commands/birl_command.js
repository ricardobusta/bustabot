const telegramCommands = require('../bot_core/telegram_commands');

module.exports = {
    key: "birl",
    help: "Birl",
    execute: function(params, req){
        telegramCommands.sendMessage(
            req.message.chat.id,
            "BIRL");
    }
}