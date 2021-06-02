import telegramCommands = require("../../bot_core/Telegram/telegram_commands");
import TelegramBot = require("node-telegram-bot-api");
import BotCommand from "../../bot_core/Bot/bot_command";

const phrases = [
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
    keys = ["ovo"];
    description = "Cocorecocoooo.";
    wip = false;
    execute = function (_commandKey: string, botKey: string, _params: string[], message: TelegramBot.Message, _data: any): void {
        let index = Math.floor(Math.random() * phrases.length);
        telegramCommands.sendMessage(botKey, message.chat.id, message.message_id, phrases[index]);
    }

}

export default new Ovo();