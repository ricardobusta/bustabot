import TelegramBot = require("node-telegram-bot-api");
import BotExecuteContext from "./bot_execute_data";
import TelegramService from "./telegram_service";

abstract class BotCommand {
    abstract keys: Array<string>;
    abstract description: string;

    protected telegram: TelegramService;

    constructor(telegram: TelegramService) {
        this.telegram = telegram;
    }

    abstract Execute(ctx: BotExecuteContext): Promise<void>;

    GetTelegramCommand(): TelegramBot.BotCommand {
        return {description: this.description, command: this.keys[0]};
    }

    GetParamMessage(message: TelegramBot.Message, params0: string): string {
        return message.text.substring(params0.length, params0.length + 20).trim().toUpperCase();
    }

    wip: boolean = false;
}

export default BotCommand;