const telegramCommands = require("../bot_core/telegram_commands");

function RandomRange(min, max) {
    return Math.floor((Math.random() * (max - min + 1) + min));
}

module.exports = {
    keys: ["roll", "dice"],
    description: "Rolls a dice.",
    execute: function (key, params, req) {
        telegramCommands.sendMessage(
            key, 
            req.message.chat.id,
            req.message.message_id,
            "<code>Rolling Dice: " + RandomRange(1, 6) + "</code>");
    }
}