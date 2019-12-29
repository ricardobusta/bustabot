import telegramCommands = require("../bot_core/telegram_commands");
import jb = require("../bot_core/jukebot_common");

let data = null;

export const keys = ["rodada"];
export const description = "Mostra quem ainda falta e a rodada atual.";
export function execute(key: string, params, req) {
    let chatId = req.message.chat.id;

    let sendMessage = function (message) {
        telegramCommands.sendMessage(
            key,
            chatId,
            req.message.message_id,
            message);
    }

    let document = data.doc(jb.docName + chatId);
    document.get()
        .then(doc => {
            let data = {
                pool: [],
                next: ""
            }
            if (doc.exists) {
                data = doc.data();
            }

            let msg = "Próximo: @" + data.next + "\n";

            msg += "Em seguida:\n"
            for (let i = 0; i < data.pool.length; i++) {
                msg += data.pool[i] + "\n";
            }
            sendMessage(msg);
        })
        .catch(err => {
            console.log("Error getting document", err);
        })
};