import {BotCommand, BotCommandContext} from "../../bot_core/Bot/bot_command";

function RandomRange(min: number, max: number): number {
    return Math.floor((Math.random() * (max - min + 1) + min));
}

class Roll extends BotCommand {
    keys: string[] = ["roll", "dice"];
    description: string = "Rolls a dice.";

    async Execute(ctx: BotCommandContext): Promise<void> {
        this.telegram.SendMessage(
            ctx.botKey,
            ctx.message.chat.id,
            ctx.message.message_id,
            `<code>Rolling Dice: ${RandomRange(1, 6)}</code>`);
    }
}

export default Roll;