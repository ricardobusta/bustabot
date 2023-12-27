import BotCommand from "../../bot_core/Bot/bot_command";
import BotExecuteContext from "../../bot_core/Bot/bot_execute_data";

class Merge extends BotCommand {
    keys: string[] = ["merge"];
    description: string = "Merge Pokemon";
    wip: boolean = true;
    execute: (ctx: BotExecuteContext) => Promise<void> = async function (ctx: BotExecuteContext): Promise<void> {
        function sendMessage(text: string): void {
            this.telegram.SendMessage(
                ctx.botKey,
                ctx.message.chat.id,
                null,
                text);
        }

        function sendPicture(url: string): void {
            this.telegram.SendPhoto(
                ctx.botKey,
                ctx.message.chat.id,
                null,
                url);
        }

        if (ctx.params.length != 3) {
            sendMessage("You must enter 2 numbers as parameters");
            return;
        }

        let n1: number = parseInt(ctx.params[1]);
        let n2: number = parseInt(ctx.params[2]);
        if (isNaN(n1) || isNaN(n2)) {
            sendMessage("Both parameters must be valid numbers.");
            return;
        }

        let customBattlerUrl: string = `https://raw.githubusercontent.com/Aegide/custom-fusion-sprites/main/CustomBattlers/${n1}.${n2}.png`
        let fusionSpriteUrl: string = `https://raw.githubusercontent.com/Aegide/autogen-fusion-sprites/master/Battlers/1/${n1}/${n1}.${n2}.png`


        if (await this.telegram.IsValidUrl(customBattlerUrl)) {
            sendPicture(customBattlerUrl);
        } else if (await this.telegram.IsValidUrl(fusionSpriteUrl)) {
            sendPicture(fusionSpriteUrl);
        } else {
            sendMessage("Image not found");
        }
    }
}

export default new Merge();