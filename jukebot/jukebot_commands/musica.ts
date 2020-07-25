import telegramCommands = require("../../bot_core/Telegram/telegram_commands");
import jb = require("../jukebot_common");
import BotCommand from "../../bot_core/Bot/bot_command";
import JukebotDoc from "../jukebot_doc";

function ValidURL(url: string) {
    return (url.startsWith("https://www.youtube.com/") || url.startsWith("https://youtu.be/"));
}

function GetNextUser(docData, document) {
    if (docData.pool.length > 0) {
        let index = Math.floor(Math.random() * docData.pool.length);
        docData.past.push(docData.next)
        docData.next = docData.pool[index];
        docData.pool.splice(index, 1);
        document.set(docData);
    } else {
        if (docData.next != "") {
            docData.next = "";
            document.set(docData);
        }
    }
}

class Musica extends BotCommand {
    keys = ["musica"];
    description = "Musica link do YouTube(não sei se dá pra o bot add ela numa Playlist do YouTube) ";
    execute(key: string, params: string[], req: any, data: any): void {
        let chatId = req.message.chat.id;

        let sendMessage = function (message: string) {
            telegramCommands.sendMessage(
                key,
                chatId,
                req.message.message_id,
                message);
        }

        if (params.length != 2) {
            sendMessage("Parâmetros inválidos. É preciso enviar um link do youtube.\n/musica vid");
            return;
        }

        let vidURL = params[1];

        if (!ValidURL(vidURL)) {
            sendMessage("O video enviado não é uma URL de YouTube válida.");
            return;
        }

        let document = data.doc(jb.docName + chatId);
        document.get()
            .then(doc => {
                let docData: JukebotDoc = new JukebotDoc();
                if (doc.exists) {
                    docData = doc.data();
                    if (!docData.timestamp) {
                        docData.timestamp = "1980-01-01";
                    }
                }

                let from = req.message.from.username;

                if (docData.next != from) {
                    sendMessage(`Usuário ${from} não é o próximo.`);
                    return;
                }

                let today = new Date();
                today.setHours(0, 0, 0, 0);

                if (!(new Date(docData.timestamp) < today)) {
                    sendMessage("Música de hoje já enviada. Espere até amanhã.");
                    return;
                }

                sendMessage(vidURL);

                docData.timestamp = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

                GetNextUser(docData, document);

                let msg = "";
                msg += `Próximo: @${docData.next}\n`;

                if (docData.pool.length > 0) {
                    msg += "Em seguida: \n";
                    for (let i = 0; i < docData.pool.length; i++) {
                        msg += docData.pool[i] + "\n";
                    }
                }
                if (data.past.length > 0) {
                    msg += "Já foi:\n"
                    for (let i = 0; i < data.past.length; i++) {
                        msg += data.past[i] + "\n";
                    }
                }
                sendMessage(msg);
            })
            .catch(err => {
                console.log("Error getting document", err);
            })
    }
}

export default new Musica();
