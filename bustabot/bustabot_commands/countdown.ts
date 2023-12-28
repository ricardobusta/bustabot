import BotCommand from "../../bot_core/Bot/bot_command";
import BotExecuteContext from "../../bot_core/Bot/bot_execute_data";

class Countdown extends BotCommand {
    keys: string[] = ["countdown", "cd"];
    description: string = "Contagem regressiva até 10 segundos.";

    async Execute(ctx: BotExecuteContext): Promise<void> {
        if (ctx.params.length != 2) {
            this.telegram.SendMessage(ctx.botKey, ctx.message.chat.id, ctx.message.message_id,
                "Número inválido de parâmetros. Tente:\n<code>/cd 3</code>");
            return;
        }
        let value: number = Math.max(Math.min(+ctx.params[1], 10), 1);

        this.telegram.SendMessage(ctx.botKey, ctx.message.chat.id, ctx.message.message_id, `Contagem Regressiva! ${value}...`);
        for (let i = 0; i < value; i++) {
            setTimeout(function (): void {
                this.telegram.SendMessage(ctx.botKey, ctx.message.chat.id, null, i + (i == 0 ? "!" : "..."));
                console.log(`Counting down: ${i}`);
            }, (value - i) * 1000);
        }
    }

}

export default Countdown;