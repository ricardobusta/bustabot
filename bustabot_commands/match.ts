import telegramCommands = require("../bot_core/telegram_commands");
import BotCommand from "../bot_core/bot_command";
import TelegramMessage from "../bot_core/telegram_request";
let seedrandom = require("seedrandom");

function RandomRange(min, max, rng) {
    return Math.floor((rng * (max - min + 1) + min));
}

class Match extends BotCommand {
    keys = ["match"];
    description = "Match";
    execute(key: string, params: string[], req: TelegramMessage, data: any): void {
        let message = "";
        if (params.length != 3) {
            message = "Número de parâmetros errado.\n" +
                "/match @user1 @user2";
            console.log("Invalid");
        } else {
            let nameA = params[1].toLowerCase();
            let nameB = params[2].toLowerCase();
            let seedStr = nameA.charAt(0) < nameB.charAt(0) ? nameA + nameB : nameB + nameA;
            let rng = seedrandom(seedStr);
            let value = RandomRange(0, 100, rng());
            console.log("Selected value: " + value + "from string: " + seedStr);
            message = "O nível de match é <code>" + value + "%</code>. Deu match? " + (value > 60 ? "❤️ <code>Sim</code>!!!" : "💔 <code>Não</code>...");
        }

        telegramCommands.sendMessage(
            key,
            req.message.chat.id,
            req.message.message_id,
            message);
    }

}

export default new Match();