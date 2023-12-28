import {BotCommand, BotCommandContext} from "../../bot_core/Bot/bot_command";

class Guess extends BotCommand {
    keys: string[] = ["guess"];
    description: string = "Guess";
    wip: boolean = true;

    async Execute(ctx: BotCommandContext): Promise<void> {
        this.telegram.SendMessage(
            ctx.botKey,
            ctx.message.chat.id,
            ctx.message.message_id,
            "Guess");
    }
}

export default Guess;