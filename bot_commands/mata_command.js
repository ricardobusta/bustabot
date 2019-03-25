const telegramCommands = require('../bot_core/telegram_commands');

module.exports = {
    keys: ["mata", "kill"],
    description: "Mata",
    execute: function(params, req){
        telegramCommands.sendMessage(
            req.message.chat.id,
            "Mata");
    }
}