import telegramCommands = require("../../bot_core/Telegram/telegram_commands");
import BotCommand from "../../bot_core/Bot/bot_command";
import TelegramBot = require("node-telegram-bot-api");

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
    execute = function (_commandKey: string, botKey: string, _params: string[], message: TelegramBot.Message, _data: any): void {
        let index = Math.floor(Math.random() * phrases.length);
        telegramCommands.sendMessage(botKey, message.chat.id, message.message_id, phrases[index]);
    }

}

export default new Birl();