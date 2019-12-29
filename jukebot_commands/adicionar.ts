import telegramCommands = require("../bot_core/telegram_commands");
import jb = require("../bot_core/jukebot_common");

let data = null;
export function setData(newData) {
    data = newData;
};

export const keys = ["adicionar"];
export const description = "Adicionar usuário ao pool.";
export function execute(key: string, params, req) {
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
            let docData = {
                users: [],
            }
            if (doc.exists) {
                docData = doc.data();
            }

            docData.users.push(userName)

            document.set(docData);

            let msg = "Usuário adicionado com sucesso.\n";

            for (let i = 0; i < docData.users.length; i++) {
                msg += docData.users[i] + ",\n";
            }

            sendMessage(msg);
        })
        .catch(err => {
            console.log("Error getting document", err);
        })
}