const telegramCommands = require('../bot_core/telegram_commands');

module.exports = {
    keys: ["coin"],
    description: "Coin",
    execute: function(params, req){
        telegramCommands.sendMessage(
            req.message.chat.id,
            "COIN");
    }
}