const telegramCommands = require("../bot_core/telegram_commands");
const jb = require("../bot_core/jukebot_common");

function ValidURL(url: string) {
    return (url.startsWith("https://www.youtube.com/") || url.startsWith("https://youtu.be/"));
}

function GetNextUser(data, document) {
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
}


export const keys = ["musica"];
export const description = "Musica link do YouTube(não sei se dá pra o bot add ela numa Playlist do YouTube) ";
let data = null;
export function setData(newData) {
    this.data = newData;
};
export function execute(key: string, params, req) {
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

    let document = this.data.doc(jb.docName + chatId);
    document.get()
        .then(doc => {
            let data = {
                pool: [],
                next: "",
                timestamp: "1980-01-01"
            }
            if (doc.exists) {
                data = doc.data();
                if (!data.timestamp) {
                    data.timestamp = "1980-01-01";
                }
            }

            let from = req.message.from.username;

            if (data.next != from) {
                sendMessage("Usuário " + from + " não é o próximo.");
                return;
            }

            let today = new Date();
            today.setHours(0, 0, 0, 0);

            if (!(new Date(data.timestamp) < today)) {
                sendMessage("Música de hoje já enviada. Espere até amanhã.");
                return;
            }

            sendMessage(vidURL);

            data.timestamp = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

            GetNextUser(data, document);

            let msg = "";
            msg += "Próximo: @" + data.next + "\n";
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
