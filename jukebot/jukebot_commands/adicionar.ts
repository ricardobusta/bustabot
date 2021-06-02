import telegramCommands = require("../../bot_core/Telegram/telegram_commands");
import jb = require("../jukebot_common");
import BotCommand from "../../bot_core/Bot/bot_command";

class Adicionar extends BotCommand {
    keys = ["adicionar"];
    description = "Adicionar usuário ao pool.";
    execute = function (_commandKey: string, botKey: string, params: string[], req: any, data: any): void {
        let chatId = req.message.chat.id;

        let sendMessage = function (message) {
            telegramCommands.sendMessage(
                botKey,
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

                if (docData.users.indexOf(userName) > -1) {
                    sendMessage("Usuário já adicionado.");
                    return;
                }

                docData.users.push(userName)
                document.set(docData);

                let msg = "Usuário adicionado com sucesso.\n";
                msg += "Usuários na lista:\n";
                for (let i = 0; i < docData.users.length; i++) {
                    msg += `${docData.users[i]},\n`;
                }

                sendMessage(msg);
            })
            .catch(err => {
                console.log("Error getting document", err);
            })
    }
}

export default new Adicionar();