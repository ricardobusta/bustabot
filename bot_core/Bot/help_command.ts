import BotCommand from "./bot_command";
import BotExecuteContext from "./bot_execute_data";
import TelegramService from "./telegram_service";

class HelpCommand extends BotCommand {
    description: string;
    keys: Array<string>;
    private readonly botName: string;
    private readonly version: string;
    private commands: Array<BotCommand>;

    constructor(telegram: TelegramService, botName: string, version: string) {
        super(telegram);
        this.botName = botName;
        this.version = version;
    }

    SetCommands(commands: Array<BotCommand>): void {
        console.log(`Set Commands ${commands.keys}`);
        this.commands = commands;
    }

    async Execute(ctx: BotExecuteContext): Promise<void> {
        console.log("Logging Help!");

        let helpString: string = `<b>${this.botName} v${this.version} Help:</b>\n`;
        for (let i in this.commands) {
            console.log(`Adding help for ${i}`);
            let command: BotCommand = this.commands[i];
            if (command.wip) {
                continue;
            }
            helpString += `/${command.keys[0]} - ${command.description}\n`;
        }

        this.telegram.SendMessage(
            ctx.botKey,
            ctx.message.chat.id,
            ctx.message.message_id,
            helpString);
    }
}

export default HelpCommand;