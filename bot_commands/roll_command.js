const telegramCommands = require('../bot_core/telegram_commands');

module.exports = {
    key: "roll",
    help: "Rolls a dice.",
    execute: function(params, req){
        telegramCommands.sendMessage(
            req.message.chat.id,
            "Rolling Dice: " + Math.round(Math.random()*6).toString());
    }
}