import telegramCommands = require("../bot_core/telegram_commands");
import BotCommand from "../bot_core/bot_command";
import TelegramRequest from "../bot_core/telegram_request";

const statisticsDocName = "statistics";

class Count extends BotCommand {
    keys = ["count", "++"];
    description = "Counts how many times the command was invoked";
    execute(key: string, params: string[], req: TelegramRequest, data: any): void {
        if (data == undefined || data == null) {
            console.log("Data not set.");
            return;
        }

        data.doc(statisticsDocName).get()
            .then(doc => {
                let currentCount = 0;
                if (doc.exists) {
                    currentCount = doc.data().command_count;
                    console.log("Current count: " + currentCount);
                }

                let message = "Contei até " + (currentCount + 1) + "!";

                telegramCommands.sendMessage(
                    key,
                    req.message.chat.id,
                    req.message.message_id,
                    message);
            })
            .catch(err => {
                let message = "Foi mal, esqueci..."
                console.log("Error getting document", err);

                telegramCommands.sendMessage(
                    key,
                    req.message.chat.id,
                    req.message.message_id,
                    message);
            });
    }

}

export default new Count();