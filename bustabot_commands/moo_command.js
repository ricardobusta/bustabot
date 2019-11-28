const telegramCommands = require("../bot_core/telegram_commands");

function RandomRange(min, max) {
    return Math.floor((Math.random() * (max - min + 1) + min));
}

module.exports = {
    keys: ["moo", "muu"],
    description: "Moos",
    execute: function (key, params, req) {

        let value = RandomRange(1, 10);
        message = "M";
        for(let i=0;i<value;i++){
            message += "o";
        }

        var cowChance = RandomRange(1,10);
        if(cowChance==1){
            message += " 🐮";
        }

        telegramCommands.sendMessage(
            key,
            req.message.chat.id,
            null,
            message);
    }
}