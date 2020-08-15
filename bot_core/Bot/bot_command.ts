import TelegramBot = require("node-telegram-bot-api");

abstract class BotCommand {
    abstract keys: Array<string>;
    abstract description: string;
    abstract execute(key: string, params: Array<string>, req: TelegramBot.Message, data: any): void;

    GetTelegramCommand(): TelegramBot.BotCommand {
        return { description: this.description, command: this.keys[0] };
    }

    wip = false;
}

export default BotCommand;