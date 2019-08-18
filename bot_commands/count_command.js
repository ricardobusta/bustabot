const telegramCommands = require("../bot_core/telegram_commands");

const documentName = "count_command";

module.exports = {
    keys: ["count", "++"],
    description: "Counts how many times the command was invoked",
    data: null,
    setData: function (newData) {
        data = newData;
    },
    execute: function (params, req) {
        if (data == undefined || data == null) {
            console.log("Data not set.");
            return;
        }

        data.doc(documentName).get()
            .then(doc => {
                let currentCount = 0;
                if (!doc.exists) {
                    data.doc(documentName).set({
                        count: 0
                    });
                } else {
                    currentCount = doc.data().count;
                    console.log("Current count: " + currentCount);
                    data.doc(documentName).set({
                        count: currentCount + 1
                    });
                }

                let message = "Contei até " + currentCount + "!";

                telegramCommands.sendMessage(
                    req.message.chat.id,
                    message);
            })
            .catch(err => {
                let message = "Foi mal, esqueci..."
                console.log("Error getting document", err);

                telegramCommands.sendMessage(
                    req.message.chat.id,
                    message);
            });
    }
}