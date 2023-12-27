import TelegramBot = require("node-telegram-bot-api");
import BotExecuteContext from "./bot_execute_data";
import RequestService from "./request_service";
import TelegramService from "./telegram_service";

export type BotCommandExecute = (context: BotExecuteContext) => void;

abstract class BotCommand {
    abstract keys: Array<string>;
    abstract description: string;
    abstract execute: BotCommandExecute;

    request: RequestService = new RequestService();
    telegram: TelegramService = new TelegramService(this.request);

    GetTelegramCommand(): TelegramBot.BotCommand {
        return { description: this.description, command: this.keys[0] };
    }

    GetParamMessage(message: TelegramBot.Message, params0: string): string {
        return message.text.substring(params0.length, params0.length + 20).trim().toUpperCase();
    }

    wip: boolean = false;
}

export default BotCommand;