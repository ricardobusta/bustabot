import {BotCommand, BotCommandContext} from "../../bot_core/Bot/bot_command";

function RandomRange(min, max): number {
    return Math.floor((Math.random() * (max - min + 1) + min));
}

class Moo extends BotCommand {
    keys: string[] = ["moo", "muu"];
    description: string = "Moos";

    async Execute(ctx: BotCommandContext): Promise<void> {
        const cowChance: number = RandomRange(1, 20);
        let text: string;
        if (cowChance < 3) {
            let value: number = RandomRange(1, 10);
            text = "M";
            for (let i = 0; i < value; i++) {
                text += "o";
            }
            text += " 🐮";
        } else if (cowChance < 5) {
            let value: number = RandomRange(1, 10);
            text = "B";
            for (let i = 0; i < value; i++) {
                text += "a";
            }
            text += "h";
        } else if (cowChance < 6) {
            text = "Meow meow i'm a cow!";
        } else {
            let value: number = RandomRange(1, 10);
            text = "M";

            for (let i = 0; i < value; i++) {
                text += "o";
            }
        }

        this.telegram.SendMessage(
            ctx.botKey,
            ctx.message.chat.id,
            null,
            text);
    }
}

export default Moo;