const telegramCommands = require("../bot_core/telegram_commands");
const jb = require("../bot_core/jukebot_common");

function ValidUser(userName) {
    return userName.startsWith("@");
}

module.exports = {
    keys: ["remover"],
    description: "Remove usuário da pool.",
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
            sendMessage("Argumentos inválidos.\n/remover @usuario");
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

                let msg = "";

                let index = data.users.indexOf(userName);
                if (index > -1) {
                    data.users.splice(index, 1);
                    document.set(data);
                    msg = "Usuário removido com sucesso.\n";
                } else {
                    msg = "Usuário não está na lista.\n";
                }

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