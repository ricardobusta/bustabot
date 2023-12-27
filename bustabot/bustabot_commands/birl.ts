import BotCommand from "../../bot_core/Bot/bot_command";
import BotExecuteContext from "../../bot_core/Bot/bot_execute_data";

const phrases: string[] = [
    "TÁ SAINDO DA JAULA, O <b>MONSTRO</b>!",
    "<b>BIIIIRRRLLL</b>!!!",
    "É 37 ANOS <b>PORRA</b>!",
    "AQUI É <b>BODYBUILDER</b>, PORRA!",
    "SAÍ DE CASA, COMI PRA CARALHO!",
    "QUE NÃO VAI DAR, RAPAZ?",
    "O MUTANTE CHEGOU!",
    "É HORA DO SHOW, <b>PORRA</b>!"
];

class Birl extends BotCommand {
    keys: string[] = ["birl"];
    description: string = "Birl.";
    execute: (ctx: BotExecuteContext) => void = function (ctx: BotExecuteContext): void {
        let index: number = Math.floor(Math.random() * phrases.length);
        this.telegram.SendMessage(ctx.botKey, ctx.message.chat.id, ctx.message.message_id, phrases[index]);
    }

}

export default new Birl();