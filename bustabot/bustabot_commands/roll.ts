import telegramCommands = require("../../bot_core/Telegram/telegram_commands");
import BotCommand from "../../bot_core/Bot/bot_command";
import TelegramBot = require("node-telegram-bot-api");

function RandomRange(min: number, max: number) {
    return Math.floor((Math.random() * (max - min + 1) + min));
}

class Roll extends BotCommand {
    keys = ["roll", "dice"];
    description = "Rolls a dice.";
    execute = function (_commandKey: string, botKey: string, _params: string[], message: TelegramBot.Message, _data: any): void {
        telegramCommands.sendMessage(
            botKey,
            message.chat.id,
            message.message_id,
            `<code>Rolling Dice: ${RandomRange(1, 6)}</code>`);
    }

}

export default new Roll();