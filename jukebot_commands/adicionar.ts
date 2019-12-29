const telegramCommands = require("../bot_core/telegram_commands");
const jb = require("../bot_core/jukebot_common");

module.exports = {
    keys: ["adicionar"],
    description: "Adicionar usuário ao pool.",
    data: null,
    setData: function (newData) {
        data = newData;
    },
    execute: function (key, params, req) {
        let chatId = req.message.chat.id;

        let sendMessage = function (message) {
            telegramCommands.sendMessage(
                key,
                chatId,
                req.message.message_id,
                message);
        }

        if (params.length != 2) {
            sendMessage("Argumentos inválidos.\n/adicionar @usuario");
            return;
        }

        let userName = params[1];

        // validate userName
        if (!jb.ValidUser(userName)) {
            sendMessage("Usuário Inválido.");
            return;
        }

        userName = userName.substr(1);

        let document = data.doc(jb.docName + chatId);
        document.get()
            .then(doc => {
                let data = {
                    users: [],
                }
                if (doc.exists) {
                    data = doc.data();
                }

                data.users.push(userName)

                document.set(data);

                let msg = "Usuário adicionado com sucesso.\n";

                for (let i = 0; i < data.users.length; i++) {
                    msg += data.users[i] + ",\n";
                }

                sendMessage(msg);
            })
            .catch(err => {
                console.log("Error getting document", err);
            })
    }
}