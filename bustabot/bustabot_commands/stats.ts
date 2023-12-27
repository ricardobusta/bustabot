import BotCommand from "../../bot_core/Bot/bot_command";
import BotExecuteContext from "../../bot_core/Bot/bot_execute_data";

class Stats extends BotCommand {
    keys: string[] = ["stats"];
    description: string = "Estatísticas do bot";
    execute: (ctx: BotExecuteContext) => void = function (ctx: BotExecuteContext): void {
        let document: any = ctx.data.doc("statistics");
        document.get()
            .then((doc): void => {
                let json: string = JSON.stringify(doc.data()).replace(/[{}]/, "").split(",").join(",\n");
                this.telegram.SendMessage(
                    ctx.botKey,
                    ctx.message.chat.id,
                    ctx.message.message_id,
                    "Bot statistics: \n" + json
                );
            }).catch((e): void => {
            console.log("Failed to get statistics document.");
        });
    }
}

export default new Stats();