const telegramBotKey = require("../bot_info").key;
const telegramApiURL = "https://api.telegram.org/bot" + telegramBotKey + "/";
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
    },

    sendPhoto: function(chatId, photoId){
        request.post(telegramApiURL + "sendPhoto",
        {
            json: {
                method: "sendPhoto",
                chat_id: chatId,
                photo: photoId,
                parse_mode: "HTML",
            }
        },
        (error, res, body) => {
            if (error) {
                console.log(error);
                return;
            }
            console.log(body);
        });
    }
}