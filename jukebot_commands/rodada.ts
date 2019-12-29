const telegramCommands = require("../bot_core/telegram_commands");
const jb = require("../bot_core/jukebot_common");

module.exports = {
    keys: ["rodada"],
    description: "Mostra quem ainda falta e a rodada atual.",
    execute: function (key, params, req) {
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
    }
}