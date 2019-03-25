const telegramCommands = require('../bot_core/telegram_commands');

module.exports = {
    key: "coin",
    help: "Coin",
    execute: function(params, req){
        telegramCommands.sendMessage(
            req.message.chat.id,
            "COIN");
    }
}