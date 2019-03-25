const telegramCommands = require('../bot_core/telegram_commands');

module.exports = {
    keys: ["roll", "dice"],
    help: "Rolls a dice.",
    execute: function(params, req){
        telegramCommands.sendMessage(
            req.message.chat.id,
            "Rolling Dice: " + Math.floor((Math.random()*6)+1).toString());
    }
}