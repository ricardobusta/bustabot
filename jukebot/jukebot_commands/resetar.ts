import telegramCommands = require("../../bot_core/Telegram/telegram_commands");
import jb = require("../jukebot_common");
import BotCommand from "../../bot_core/Bot/bot_command";
import JukebotDoc from "../jukebot_doc";

export function execute(key: string, params, req) {

};

class Resetar extends BotCommand {
    keys = ["resetar"];
    description = "Resetar (possivelmente pedindo uma confirmação?)";
    execute = function (_commandKey: string, botKey: string, _params: string[], req: any, data: any): void {
        let chatId = req.message.chat.id;

        let sendMessage = function (message: string) {
            telegramCommands.sendMessage(
                botKey,
                chatId,
                req.message.message_id,
                message);
        }

        let document = data.doc(jb.docName + chatId);
        document.get()
            .then(doc => {
                let data: JukebotDoc = new JukebotDoc();
                if (doc.exists) {
                    data = doc.data();
                }

                data.pool = data.users.slice();
                if (data.pool.length > 0) {
                    let index = Math.floor(Math.random() * data.pool.length);
                    data.next = data.pool[index];
                    data.pool.splice(index, 1);
                    data.past = [];
                    document.set(data);
                }

                let msg = "Nova rodada iniciada.\n";
                msg += "Próximo: @" + data.next + "\n";
                if (data.pool.length > 0) {
                    msg += "Em seguida: \n";
                    for (let i = 0; i < data.pool.length; i++) {
                        msg += data.pool[i] + "\n";
                    }
                }
                sendMessage(msg);
            })
            .catch(err => {
                console.log("Error getting document", err);
            })
    }
}
export default new Resetar();