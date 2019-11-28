const telegramCommands = require("../bot_core/telegram_commands");
const documentName = "userList";

module.exports = {
    keys: ["next"],
    description: "Sorteia a próxima pessoa da lista.",
    data: null,
    setData: function (newData) {
        data = newData;
    },
    execute: function (key, params, req) {
        if (data == undefined || data == null) {
            console.log("Data not set.");
            return;
        }
        data.doc(documentName).get()
        .then(doc => {
        }) 
        .catch(err => {
            let message = "Ih deu erro."
            console.log("Error getting document", err);

            telegramCommands.sendMessage(
                key, 
                req.message.chat.id,
                message);
        });
    }
}