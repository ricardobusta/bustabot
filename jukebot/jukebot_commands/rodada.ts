import telegramCommands = require("../../bot_core/Telegram/telegram_commands");
import jb = require("../jukebot_common");
import BotCommand from "../../bot_core/Bot/bot_command";
import JukebotDoc from "../jukebot_doc";

class Rodada extends BotCommand {
    keys = ["rodada"];
    description = "Mostra quem ainda falta e a rodada atual.";
    execute = function (_commandKey: string, botKey: string, _params: string[], req: any, data: any): void {
        let chatId = req.message.chat.id;

        let sendMessage = function (message) {
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

                let msg = "Próximo: @" + data.next + "\n";

                if (data.pool.length > 0) {
                    msg += "Em seguida:\n"
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
export default new Rodada();