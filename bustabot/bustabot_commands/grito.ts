import BotCommand from "../../bot_core/Bot/bot_command";
import BotExecuteContext from "../../bot_core/Bot/bot_execute_data";

class Grito extends BotCommand {
    keys: string[] = ["grito", "shout"];
    description: string = "Shout a phrase";
    execute: (ctx: BotExecuteContext) => void = function (ctx: BotExecuteContext): void {
        if (ctx.params.length < 2) {
            this.telegram.SendMessage(
                ctx.botKey,
                ctx.message.chat.id,
                ctx.message.message_id,
                "Shout something.");
            return;
        }

        let msg: string = ctx.message.text.substring(ctx.params[0].length, ctx.params[0].length + 20).trim().toUpperCase();

        let text: string = "<code>" + msg.split('').join(' ');

        for (let i = 1; i < msg.length; i++) {
            text += "\n" + msg[i] + " ".repeat(i * 2 - 1) + msg[i];
        }

        text += "</code>"

        this.telegram.SendMessage(
            ctx.botKey,
            ctx.message.chat.id,
            ctx.message.message_id,
            text);
    }
}

export default new Grito();