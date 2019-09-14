const request = require("request");

function getBotApiURL(botKey, command) {
    return "https://api.telegram.org/bot" + botKey + "/" + command;
}

module.exports = {
    sendMessage: function (botKey, chatId, message) {
        request.post(getBotApiURL(botKey, "sendMessage"),
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

    sendPhoto: function (botKey, chatId, photoId) {
        request.post(getBotApiURL(botKey, "sendPhoto"),
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