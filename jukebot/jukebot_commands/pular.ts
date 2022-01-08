import telegramCommands = require("../../bot_core/Telegram/telegram_commands");
import jb = require("../jukebot_common");
import BotCommand from "../../bot_core/Bot/bot_command";
import JukebotDoc from "../jukebot_doc";
import BotExecuteContext from "../../bot_core/Bot/bot_execute_data";

class Pular extends BotCommand {
    keys = ["pular"];
    description = "Pular (também com confirmação)";
    execute = function (ctx: BotExecuteContext): void {
        let chatId = ctx.message.chat.id;

        let sendMessage = function (message) {
            telegramCommands.sendMessage(
                ctx.botKey,
                chatId,
                ctx.message.message_id,
                message);
        }

        let document = ctx.data.doc(jb.docName + chatId);
        document.get()
            .then(doc => {
                let data: JukebotDoc = new JukebotDoc();
                if (doc.exists) {
                    data = doc.data();
                }

                let previous = data.next;

                if (data.pool.length > 0) {
                    let index = Math.floor(Math.random() * data.pool.length);
                    data.past.push(data.next)
                    data.next = data.pool[index];
                    data.pool.splice(index, 1);
                    document.set(data);
                } else {
                    if (data.next != "") {
                        data.next = "";
                        document.set(data);
                    }
                }

                let msg = "Usuário " + previous + " pulado.\n";
                msg += "Próximo: @" + data.next + "\n";
                msg += "Em seguida: \n";
                if (data.pool.length > 0) {
                    for (let i = 0; i < data.pool.length; i++) {
                        msg += data.pool[i] + "\n";
                    }
                }
                if (data.past.length > 0) {
                    msg += "Já foi:\n"
                    for (let i = 0; i < data.past.length; i++) {
                        msg += data.past[i] + "\n";
                    }
                }
                sendMessage(msg);
            })
            .catch(err => {
                console.log("Error getting document", err);
            })
    }
}
export default new Pular();