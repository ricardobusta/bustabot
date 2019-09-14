const telegramCommands = require("../bot_core/telegram_commands");

module.exports = {
    keys: ["grito"],
    description: "Grido",
    execute: function(key, params, req){
        telegramCommands.sendMessage(
            key, 
            req.message.chat.id,
            "Grito.");
    }
}