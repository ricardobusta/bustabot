const telegramCommands = require("../bot_core/telegram_commands");

const documentName = "statistics";

module.exports = {
    keys: ["count", "++"],
    description: "Counts how many times the command was invoked",
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
                let currentCount = 0;
                if (doc.exists) {
                    currentCount = doc.data().command_count;
                    console.log("Current count: " + currentCount);
                }

                let message = "Contei até " + (currentCount + 1) + "!";

                telegramCommands.sendMessage(
                    key,
                    req.message.chat.id,
                    req.message.message_id,
                    message);
            })
            .catch(err => {
                let message = "Foi mal, esqueci..."
                console.log("Error getting document", err);

                telegramCommands.sendMessage(
                    key,
                    req.message.chat.id,
                    req.message.message_id,
                    message);
            });
    }
}