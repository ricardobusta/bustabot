import telegramCommands = require("../bot_core/telegram_commands");
import BotCommand from "../bot_core/bot_command";
import TelegramMessage from "../bot_core/telegram_request";

function RandomRange(min, max) {
    return Math.floor((Math.random() * (max - min + 1) + min));
}

class Moo extends BotCommand {
    keys = ["moo", "muu"];
    description = "Moos";
    execute(key: string, params: string[], req: TelegramMessage, data: any): void {
        var cowChance = RandomRange(1, 20);
        let message: string;
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

export default new Moo();