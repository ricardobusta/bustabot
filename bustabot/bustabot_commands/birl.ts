import telegramCommands = require("../../bot_core/telegram_commands");
import BotCommand from "../../bot_core/bot_command";
import TelegramMessage from "../../bot_core/telegram_request";

const phrases = [
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
    keys = ["birl"];
    description = "Birl.";
    execute(key: string, _params: string[], req: TelegramMessage, _data: any): void {
        let index = Math.floor(Math.random() * phrases.length);
        telegramCommands.sendMessage(key, req.message.chat.id, req.message.message_id, phrases[index]);
    }

}

export default new Birl();