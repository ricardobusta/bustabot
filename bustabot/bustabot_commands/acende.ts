import telegramCommands = require("../../bot_core/Telegram/telegram_commands");
import BotCommand from "../../bot_core/Bot/bot_command";
import BotExecuteContext from "../../bot_core/Bot/bot_execute_data";

const papocoMin: number = 3;
const papocoMax: number = 6;

function RandomInt(min: number, max: number, dices: number): number {
    let result: number = max;
    for (let i = 0; i < dices; i++) {
        result = Math.min(result, min + Math.floor(Math.random() * (max - min)));
    }
    return result;
}

function PapocoString(min: number, max: number): string {
    let count: number = RandomInt(min, max, 4);
    let result: string = "";
    for (let i = 0; i < count; i++) {
        result += "pra ";
    }
    return result;
}

function PowString(min: number, max: number): string {
    let failProb: number = RandomInt(1, 100, 1);
    if (failProb <= 5) {
        return "...";
    }

    let count: number = RandomInt(min, max, 1);

    let result: string = "P";
    for (let i = 0; i < count; i++) {
        result += "OOO";
    }
    for (let i = 0; i < count; i++) {
        result += "W";
    }
    return result;
}

class Countdown extends BotCommand {
    keys: string[] = ["acende", "rojao", "papoco"];
    description: string = "Acende o rojão.";
    execute: (ctx: BotExecuteContext) => void = function (ctx: BotExecuteContext): void {
        let papocoCount: number = RandomInt(papocoMin, papocoMax, 1);
        let delay: number = 0;
        telegramCommands.sendMessage(ctx.botKey, ctx.message.chat.id, null, PapocoString(1, 3));
        for (let i = 0; i < papocoCount; i++) {
            delay += RandomInt(300, 600, 1);
            setTimeout(function (): void {
                telegramCommands.sendMessage(ctx.botKey, ctx.message.chat.id, null, PapocoString(i == Math.ceil(papocoCount / 2) ? 3 : 1, 7));
            }, delay);
        }
        delay += 3000;
        setTimeout(function (): void {
            telegramCommands.sendMessage(ctx.botKey, ctx.message.chat.id, null, PowString(1, 4));
        }, delay);
    }
}

export default new Countdown();