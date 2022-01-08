import TelegramBot = require("node-telegram-bot-api");
import telegramCommands = require("../../bot_core/Telegram/telegram_commands");
import BotExecuteContext from "./bot_execute_data";

export type BotCommandExecute = (context: BotExecuteContext) => void;

abstract class BotCommand {
    abstract keys: Array<string>;
    abstract description: string;
    abstract execute: BotCommandExecute;

    GetTelegramCommand(): TelegramBot.BotCommand {
        return { description: this.description, command: this.keys[0] };
    }

    GetParamMessage(message: TelegramBot.Message, params0: string): string {
        return message.text.substring(params0.length, params0.length + 20).trim().toUpperCase();
    }

    HaveMinParamAmount(context: BotExecuteContext, paramAmout: number, errorMessage: string): boolean {
        if (context.params.length - 1 < paramAmout) {
            telegramCommands.sendMessage(
                context.botKey,
                context.message.chat.id,
                context.message.message_id,
                errorMessage);
            return false;
        }
        return true;
    }

    wip = false;
}

export default BotCommand;