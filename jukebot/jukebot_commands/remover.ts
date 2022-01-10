import telegramCommands = require("../../bot_core/Telegram/telegram_commands");
import jb = require("../jukebot_common");
import BotCommand from "../../bot_core/Bot/bot_command";
import JukebotDoc from "../jukebot_doc";
import BotExecuteContext from "../../bot_core/Bot/bot_execute_data";

class Remover extends BotCommand {
    keys = ["remover"];
    description = "Remove usuário da pool.";
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
            sendMessage("Argumentos inválidos.\n/remover @usuario");
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
                let data: JukebotDoc = new JukebotDoc();
                if (doc.exists) {
                    data = doc.data() as JukebotDoc;
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

                msg += "Usuários na lista:\n";
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
export default new Remover();