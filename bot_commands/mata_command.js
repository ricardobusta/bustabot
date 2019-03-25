const telegramCommands = require('../bot_core/telegram_commands');

module.exports = {
    key: "mata",
    help: "Mata",
    execute: function(params, req){
        telegramCommands.sendMessage(
            req.message.chat.id,
            "Mata");
    }
}