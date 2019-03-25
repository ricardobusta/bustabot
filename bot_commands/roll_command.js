const telegramCommands = require('../bot_core/telegram_commands');

function RandomRange(min, max){
    return Math.floor((Math.random()*(max-min+1)+min));
}

module.exports = {
    keys: ["roll", "dice"],
    help: "Rolls a dice.",
    execute: function(params, req){
        telegramCommands.sendMessage(
            req.message.chat.id,
            "<code>Rolling Dice: " + RandomRange(1,6) + "</code>");
    }
}