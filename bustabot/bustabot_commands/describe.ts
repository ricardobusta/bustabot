import BotCommand from "../../bot_core/Bot/bot_command";
import BotExecuteContext from "../../bot_core/Bot/bot_execute_data";

class Describe extends BotCommand {
    keys: string[] = ["desc", "descreve"];
    description: string = "Descreve uma imagem";

    async Execute(ctx: BotExecuteContext): Promise<void> {
        this.telegram.SendMessage(
            ctx.botKey,
            ctx.message.chat.id,
            ctx.message.message_id,
            "interp");
    }
}

export default Describe;