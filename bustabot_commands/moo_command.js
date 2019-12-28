const telegramCommands = require("../bot_core/telegram_commands");

function RandomRange(min, max) {
    return Math.floor((Math.random() * (max - min + 1) + min));
}

module.exports = {
    keys: ["moo", "muu"],
    description: "Moos",
    execute: function (key, params, req) {


        var cowChance = RandomRange(1, 20);
        if (cowChance < 3) {
            let value = RandomRange(1, 10);
            message = "M";
            for (let i = 0; i < value; i++) {
                message += "o";
            }
            message += " 🐮";
        } else if (cowChance < 5) {
            let value = RandomRange(1, 10);
            message = "B";
            for (let i = 0; i < value; i++) {
                message += "a";
            }
            message += "h";
        } else if (cowChance < 6) {
            message = "Meow meow i'm a cow!";
        } else {
            let value = RandomRange(1, 10);
            message = "M";

            for (let i = 0; i < value; i++) {
                message += "o";
            }
        }

        telegramCommands.sendMessage(
            key,
            req.message.chat.id,
            null,
            message);
    }
}