import TelegramBot = require("node-telegram-bot-api");

export type BotCommandExecute = (commandKey: string, botKey: string, params: Array<string>, req: TelegramBot.Message, data: any) => void;

abstract class BotCommand {
    abstract keys: Array<string>;
    abstract description: string;
    abstract execute: BotCommandExecute;

    GetTelegramCommand(): TelegramBot.BotCommand {
        return { description: this.description, command: this.keys[0] };
    }

    wip = false;
}

export default BotCommand;