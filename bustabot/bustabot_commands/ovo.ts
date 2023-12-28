import BotCommand from "../../bot_core/Bot/bot_command";
import BotExecuteContext from "../../bot_core/Bot/bot_execute_data";

const phrases: string[] = [
    "30 ovos por 10 reais!",
    "Chegou o carro do ovo",
    "Olha o carro do ovo",
    "São ovos graúdos, ovos de <b>qualidade</b>",
    "O melhor preço é <b>aqui</b>",
    "Dez reais, freguesa! Dez reais é a cartela com 30 ovos",
    "Ovos branquinhos!",
    "🥚🥚🥚",
    "Vai passando o carro do ovo na sua rua 🚚"
];

class Ovo extends BotCommand {
    keys: string[] = ["ovo"];
    description: string = "Cocorecocoooo.";
    wip: boolean = false;

    async Execute(ctx: BotExecuteContext): Promise<void> {
        let index: number = Math.floor(Math.random() * phrases.length);
        this.telegram.SendMessage(ctx.botKey, ctx.message.chat.id, ctx.message.message_id, phrases[index]);
    }
}

export default Ovo;