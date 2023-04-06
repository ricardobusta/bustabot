import telegramCommands = require("../../bot_core/Telegram/telegram_commands");
import BotCommand from "../../bot_core/Bot/bot_command";
import BotExecuteContext from "../../bot_core/Bot/bot_execute_data";

const papocoMin = 3;
const papocoMax = 6;

function RandomInt(min: number, max: number, dices: number): number {
    let result = max;
    for (let i = 0; i < dices; i++) {
        result = Math.min(result, min + Math.floor(Math.random() * (max - min)));
    }
    return result;
}

function PapocoString(min: number, max: number): string {
    let count = RandomInt(min, max, 4);
    let result = "";
    for(let i=0;i<count;i++){
        result += "pra ";
    }
    return result;
}

function PowString(min: number, max: number): string{
    let failProb = RandomInt(1, 100, 1);
    if(failProb <= 5){
        return "...";
    }

    let count = RandomInt(min, max, 1);

    let result = "P";
    for (let i = 0; i < count; i++) {
        result += "OOO";
    }
    for (let i = 0; i < count; i++) {
        result += "W";
    }
    return result;
}

class Countdown extends BotCommand {
    keys = ["acende", "rojao", "papoco"];
    description = "Acende o rojão.";
    execute = function (ctx: BotExecuteContext): void {
        let papocoCount = RandomInt(papocoMin, papocoMax, 1);
        let delay = 0;
        telegramCommands.sendMessage(ctx.botKey, ctx.message.chat.id, null, PapocoString(1, 3));
        for (let i = 0; i < papocoCount; i++) {
            delay += RandomInt(300, 600, 1);
            setTimeout(function () {
                telegramCommands.sendMessage(ctx.botKey, ctx.message.chat.id, null, PapocoString(i==Math.ceil(papocoCount/2) ? 3 : 1, 7));
            }, delay);
        }
        delay += 3000;
        setTimeout(function () {
            telegramCommands.sendMessage(ctx.botKey, ctx.message.chat.id, null, PowString(1, 4));
        }, delay);
    }
}

export default new Countdown();