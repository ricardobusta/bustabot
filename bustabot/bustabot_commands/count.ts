import telegramCommands = require("../../bot_core/Telegram/telegram_commands");
import BotCommand from "../../bot_core/Bot/bot_command";
import TelegramBot = require("node-telegram-bot-api");

const statisticsDocName = "statistics";

class Count extends BotCommand {
    keys = ["count", "++"];
    description = "Counts how many times the command was invoked";
    execute = function (_commandKey: string, botKey: string, _params: string[], message: TelegramBot.Message, data: any): void {
        if (data == undefined || data == null) {
            console.log("Data not set.");
            return;
        }

        data.doc(statisticsDocName).get()
            .then(doc => {
                let currentCount = 0;
                if (doc.exists) {
                    currentCount = doc.data().command_count;
                    console.log(`Current count: ${currentCount}`);
                }

                let text = `Contei até ${currentCount + 1}!`;

                telegramCommands.sendMessage(
                    botKey,
                    message.chat.id,
                    message.message_id,
                    text);
            })
            .catch(err => {
                let text = "Foi mal, esqueci..."
                console.log("Error getting document", err);

                telegramCommands.sendMessage(
                    botKey,
                    message.chat.id,
                    message.message_id,
                    text);
            });
    }

}

export default new Count();