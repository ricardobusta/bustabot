import {BotCommand, BotCommandContext} from "../../bot_core/Bot/bot_command";

class Versus extends BotCommand {
    keys: string[] = ["versus", "vs"];
    description: string = "Versus";

    async Execute(ctx: BotCommandContext): Promise<void> {
        let text: string = "";
        if (ctx.params.length <= 2) {
            text = "Número de parâmetros insuficiente. Precisa de pelo menos dois.\n" +
                "/vs valor_um valor_dois .. valor_ultimo";
            console.log("Invalid");
        } else {
            let value: number = Math.floor(Math.random() * (ctx.params.length - 1)) + 1;
            console.log("Selected value: " + value);
            text = `O vencedor é: <code>${ctx.params[value]}</code>!`;
        }

        this.telegram.SendMessage(
            ctx.botKey,
            ctx.message.chat.id,
            ctx.message.message_id,
            text
        );
    }
}

export default Versus;