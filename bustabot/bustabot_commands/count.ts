import BotCommand from "../../bot_core/Bot/bot_command";
import BotExecuteContext from "../../bot_core/Bot/bot_execute_data";
import BotData from "../../bot_core/Bot/bot_data";

const statisticsDocName: string = "statistics";

class CountData extends BotData {
    command_count: number;
}

class Count extends BotCommand {
    keys: string[] = ["count", "++"];
    description: string = "Counts how many times the command was invoked";

    async Execute(ctx: BotExecuteContext): Promise<void> {
        if (ctx.data == undefined) {
            console.log("Data not set.");
            return;
        }

        ctx.data.doc(statisticsDocName).get()
            .then((doc): void => {
                let currentCount: number = 0;
                if (doc.exists) {
                    currentCount = (doc.data() as CountData).command_count;
                    console.log(`Current count: ${currentCount}`);
                }

                let text: string = `Contei até ${currentCount + 1}!`;

                this.telegram.SendMessage(
                    ctx.botKey,
                    ctx.message.chat.id,
                    ctx.message.message_id,
                    text);
            })
            .catch((err): void => {
                let text: string = "Foi mal, esqueci..."
                console.log("Error getting document", err);

                this.telegram.SendMessage(
                    ctx.botKey,
                    ctx.message.chat.id,
                    ctx.message.message_id,
                    text);
            });
    }

}

export default Count;