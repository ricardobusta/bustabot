const telegramCommands = require("../bot_core/telegram_commands");
const jb = require("../bot_core/jukebot_common");

module.exports = {
    keys: ["resetar"],
    description: "Resetar (possivelmente pedindo uma confirmação?)",
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
                    users: [],
                    pool: [],
                    next: ""
                }
                if (doc.exists) {
                    data = doc.data();
                }

                data.pool = data.users.slice();
                if (data.pool.length > 0) {
                    let index = Math.floor(Math.random() * data.pool.length);
                    data.next = data.pool[index];
                    data.pool.splice(index, 1);
                    document.set(data);
                }

                let msg = "Nova rodada iniciada.\n";
                msg += "Próximo: @" + data.next + "\n";
                msg += "Em seguida: \n";
                for (let i = 0; i < data.pool.length; i++) {
                    msg += data.pool[i].substr(1) + "\n";
                }
                sendMessage(msg);
            })
            .catch(err => {
                console.log("Error getting document", err);
            })
    }
}