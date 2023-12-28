import {BotCommand, BotCommandContext} from "../../bot_core/Bot/bot_command";

export class Describe extends BotCommand {
    keys: string[] = ["desc", "descreve"];
    description: string = "Descreve uma imagem";

    async Execute(ctx: BotCommandContext): Promise<void> {
        this.telegram.SendMessage(
            ctx.botKey,
            ctx.message.chat.id,
            ctx.message.message_id,
            "interp");
    }
}