import telegramCommands = require("../../bot_core/Telegram/telegram_commands");
import BotCommand from "../../bot_core/bot_command";
import TelegramMessage from "../../bot_core/Telegram/telegram_message";

const phrases = [
    "30 ovos por 10 reais</br>!",
    "Chegou o carro do ovo</br>",
    "Olha o carro do ovo</br>",
    "São ovos graúdos, ovos de <b>qualidade<b></br>",
    "O melhor preço é <b>aqui<b></br>",
    "Dez reais, freguesa! Dez reais é a cartela com 30 ovos</br>",
    "Ovos branquinhos!<br>",
    "🥚🥚🥚</br>",
    "Vai passando o carro do ovo na sua rua 🚚</br>"
];

class Ovo extends BotCommand {
    keys = ["ovo"];
    description = "Cocorecocoooo.";
    execute(key: string, _params: string[], req: TelegramMessage, _data: any): void {
        let index = Math.floor(Math.random() * phrases.length);
        telegramCommands.sendMessage(key, req.message.chat.id, req.message.message_id, phrases[index]);
    }

}

export default new Ovo();