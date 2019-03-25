const botKey = require("../botkey.js").key;
const telegramApiURL = "https://api.telegram.org/bot" + botKey + "/";
const request = require('request');

module.exports = {
    sendMessage: function (chatId, message) {
        request.post(telegramApiURL + "sendMessage",
            {
                json: {
                    method: "sendMessage",
                    chat_id: chatId,
                    text: message,
                    parse_mode: "HTML",
                }
            },
            (error, res, body) => {
                if (error) {
                    console.log(error);
                    return;
                }
                //console.log(res.statusCode);
                console.log(body);
            });
    }
}