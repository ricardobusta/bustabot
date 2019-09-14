const telegramCommands = require("../bot_core/telegram_commands");

module.exports = {
    keys: ["grito"],
    description: "Grido",
    execute: function(params, req){
        telegramCommands.sendMessage(
            req.message.chat.id,
            "Grito.");
    }
}