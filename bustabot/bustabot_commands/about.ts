import {BotCommand, BotCommandContext} from "../../bot_core/Bot/bot_command";
import TelegramService from "../../bot_core/Bot/telegram_service";

class About extends BotCommand {
    keys: string[] = ["about"];
    description: string = "About @BustaBot";
    version: string;

    constructor(telegram: TelegramService, version: string) {
        super(telegram);
        this.version = version;
    }

    async Execute(ctx: BotCommandContext): Promise<void> {
        this.telegram.SendMessage(
            ctx.botKey,
            ctx.message.chat.id,
            ctx.message.message_id,
            `BustaBot version ${this.version}\nMade by Ricardo Bustamante &lt;ricardo@busta.dev&gt;\nhttps://github.com/ricardobusta/bustabot`,
        );
    }
}

export default About;