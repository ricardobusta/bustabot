import telegramCommands = require("../../bot_core/Telegram/telegram_commands");
import BotCommand from "../../bot_core/Bot/bot_command";
import BotExecuteContext from "../../bot_core/Bot/bot_execute_data";

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
    execute = function (ctx: BotExecuteContext): void {
        let index = Math.floor(Math.random() * phrases.length);
        telegramCommands.sendMessage(ctx.botKey, ctx.message.chat.id, ctx.message.message_id, phrases[index]);
    }

}

export default new Ovo();