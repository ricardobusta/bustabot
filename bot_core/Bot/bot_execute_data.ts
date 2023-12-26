import TelegramBot = require("node-telegram-bot-api");
import BotData from "./bot_data";

class BotExecuteContext {
    commandKey: string;
    botKey: string;
    params: string[];
    message: TelegramBot.Message;
    data: FirebaseFirestore.CollectionReference<BotData>;
    version: number;
}

export default BotExecuteContext;