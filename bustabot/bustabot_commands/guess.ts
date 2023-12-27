import BotCommand from "../../bot_core/Bot/bot_command";
import BotExecuteContext from "../../bot_core/Bot/bot_execute_data";

class Guess extends BotCommand {
    keys: string[] = ["guess"];
    description: string = "Guess";
    execute: (ctx: BotExecuteContext) => void = function (ctx: BotExecuteContext): void {
        this.telegram.SendMessage(
            ctx.botKey,
            ctx.message.chat.id,
            ctx.message.message_id,
            "Guess");
    }
}

export default new Guess();