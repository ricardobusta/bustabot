import TelegramBot = require("node-telegram-bot-api");

class BotExecuteContext {
    commandKey: string;
    botKey: string;
    params: string[];
    message: TelegramBot.Message;
    data: any;
}

export default BotExecuteContext;