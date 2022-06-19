import telegramCommands = require("../../bot_core/Telegram/telegram_commands");
import BotCommand from "../../bot_core/Bot/bot_command";
import TelegramBot = require("node-telegram-bot-api");
import BotExecuteContext from "../../bot_core/Bot/bot_execute_data";
import BotData from "../../bot_core/Bot/bot_data";

const statisticsDocName = "statistics";

class CountData extends BotData {
    command_count: number;
}

class Count extends BotCommand {
    keys = ["count", "++"];
    description = "Counts how many times the command was invoked";
    execute = function (ctx: BotExecuteContext): void {
        if (ctx.data == undefined) {
            console.log("Data not set.");
            return;
        }

        ctx.data.doc(statisticsDocName).get()
            .then(doc => {
                let currentCount = 0;
                if (doc.exists) {
                    currentCount = (doc.data() as CountData).command_count;
                    console.log(`Current count: ${currentCount}`);
                }

                let text = `Contei até ${currentCount + 1}!`;

                telegramCommands.sendMessage(
                    ctx.botKey,
                    ctx.message.chat.id,
                    ctx.message.message_id,
                    text);
            })
            .catch(err => {
                let text = "Foi mal, esqueci..."
                console.log("Error getting document", err);

                telegramCommands.sendMessage(
                    ctx.botKey,
                    ctx.message.chat.id,
                    ctx.message.message_id,
                    text);
            });
    }

}

export default new Count();