const telegramCommands = require('../bot_core/telegram_commands');

module.exports = {
    key: "benedict",
    help: "Benedict",
    execute: function(params, req){
        telegramCommands.sendMessage(
            req.message.chat.id,
            "Will generate your benedict name.");
    }
}