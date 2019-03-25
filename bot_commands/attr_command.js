const telegramCommands = require('../bot_core/telegram_commands');

module.exports = {
    key: "attr",
    help: "Attributes",
    execute: function(params, req){
        telegramCommands.sendMessage(
            req.message.chat.id,
            "Will generate your attributes.");
    }
}