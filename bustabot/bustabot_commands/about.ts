import BotCommand from "../../bot_core/Bot/bot_command";
import BotExecuteContext from "../../bot_core/Bot/bot_execute_data";

class About extends BotCommand {
    keys: string[] = ["about"];
    description: string = "About @BustaBot";
    execute: (ctx: BotExecuteContext) => void = function (ctx: BotExecuteContext): void {
        this.telegram.SendMessage(
            ctx.botKey,
            ctx.message.chat.id,
            ctx.message.message_id,
            `BustaBot version ${ctx.version}\nMade by Ricardo Bustamante &lt;ricardo@busta.dev&gt;\nhttps://github.com/ricardobusta/bustabot`,
        );
    }
}

export default new About();