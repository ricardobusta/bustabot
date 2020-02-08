import telegramCommands = require("../../bot_core/telegram_commands");
import BotCommand from "../../bot_core/bot_command";
import TelegramMessage from "../../bot_core/telegram_request";

function RandomRange(min, max) {
    return Math.floor((Math.random() * (max - min + 1) + min));
}

class Roll extends BotCommand {
    keys = ["roll", "dice"];
    description = "Rolls a dice.";
    execute(key: string, _params: string[], req: TelegramMessage, _data: any): void {
        telegramCommands.sendMessage(
            key,
            req.message.chat.id,
            req.message.message_id,
            "<code>Rolling Dice: " + RandomRange(1, 6) + "</code>");
    }

}

export default new Roll();