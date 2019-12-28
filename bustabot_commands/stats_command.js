const telegramCommands = require("../bot_core/telegram_commands");

module.exports = {
    keys: ["stats"],
    description: "Estatísticas do bot",
    execute: function(key, params, req){
        telegramCommands.sendMessage(
            key, 
            req.message.chat.id,
            req.message.message_id,
            "Grito.");
    }
}