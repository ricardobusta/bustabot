import telegramCommands = require("../../bot_core/Telegram/telegram_commands");
import BotCommand from "../../bot_core/Bot/bot_command";
import TelegramBot = require("node-telegram-bot-api");

class Stats extends BotCommand {
    keys = ["stats"];
    description = "Estatísticas do bot";
    execute = function (_commandKey: string, botKey: string, _params: string[], message: TelegramBot.Message, _data: any): void {
        telegramCommands.sendMessage(
            botKey,
            message.chat.id,
            message.message_id,
            "Stats."
        );
    }

}

export default new Stats();