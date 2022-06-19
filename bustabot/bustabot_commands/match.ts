import telegramCommands = require("../../bot_core/Telegram/telegram_commands");
import BotCommand from "../../bot_core/Bot/bot_command";
import BotExecuteContext from "../../bot_core/Bot/bot_execute_data";

let seedrandom = require("seedrandom");

function RandomRange(min, max, rng) {
    return Math.floor((rng * (max - min + 1) + min));
}

class Match extends BotCommand {
    keys = ["match"];
    description = "Match";
    execute = function (ctx: BotExecuteContext): void {
        let text = "";
        if (ctx.params.length != 3) {
            text = "Número de parâmetros errado.\n/match @user1 @user2";
            console.log("Invalid");
        } else {
            let nameA = ctx.params[1].toLowerCase();
            let nameB = ctx.params[2].toLowerCase();
            let seedStr = nameA.charAt(0) < nameB.charAt(0) ? nameA + nameB : nameB + nameA;
            let rng = seedrandom(seedStr);
            let value = RandomRange(0, 100, rng());
            console.log(`Selected value: ${value}from string: ${seedStr}`);
            text = `O nível de match é <code>${value}%</code>. Deu match? ${value > 60 ? "❤️ <code>Sim</code>!!!" : "💔 <code>Não</code>..."}`;
        }

        telegramCommands.sendMessage(
            ctx.botKey,
            ctx.message.chat.id,
            ctx.message.message_id,
            text);
    }

}

export default new Match();