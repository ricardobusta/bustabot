import telegramCommands = require("../../bot_core/Telegram/telegram_commands");
import jb = require("../jukebot_common");
import BotCommand from "../../bot_core/Bot/bot_command";
import BotExecuteContext from "../../bot_core/Bot/bot_execute_data";
import JukebotDoc from "../jukebot_doc";

class Adicionar extends BotCommand {
    keys = ["adicionar"];
    description = "Adicionar usuário ao pool.";
    execute = function (ctx: BotExecuteContext): void {
        let chatId = ctx.message.chat.id;

        let sendMessage = function (message) {
            telegramCommands.sendMessage(
                ctx.botKey,
                chatId,
                ctx.message.message_id,
                message);
        }

        if (ctx.params.length != 2) {
            sendMessage("Argumentos inválidos.\n/adicionar @usuario");
            return;
        }

        let userName = ctx.params[1];

        // validate userName
        if (!jb.ValidUser(userName)) {
            sendMessage("Usuário Inválido.");
            return;
        }

        userName = userName.substr(1);

        let document = ctx.data.doc(jb.docName + chatId);
        document.get()
            .then(doc => {
                let docData: JukebotDoc = new JukebotDoc();

                if (doc.exists) {
                    docData = doc.data() as JukebotDoc;
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