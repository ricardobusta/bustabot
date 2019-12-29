const telegramCommands = require("../bot_core/telegram_commands");
const jb = require("../bot_core/jukebot_common");

module.exports = {
    keys: ["musica"],
    description: "Musica link do YouTube(não sei se dá pra o bot add ela numa Playlist do YouTube) ",
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
                    next: "",
                    timestamp: new Date("1988-08-12 6:30:00")
                }
                if (doc.exists) {
                    data = doc.data();
                }

                let from = req.message.from.username;

                if (data.next != from) {
                    sendMessage("Usuário " + from + " não é o próximo.");
                    return;
                }

                sendMessage("Timestamps: " + data.timestamp + " " + new Date());

                if (data.pool.length > 0) {
                    let index = Math.floor(Math.random() * data.pool.length);
                    data.next = data.pool[index];
                    data.pool.splice(index, 1);
                    document.set(data);
                } else {
                    if (data.next != "") {
                        data.next = "";
                        document.set(data);
                    }
                }

                msg += "Próximo: " + data.next + "\n";
                msg += "Em seguida: \n";
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