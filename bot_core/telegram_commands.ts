import request = require("request");

function getBotApiURL(botKey: string, command: string) {
    return "https://api.telegram.org/bot" + botKey + "/" + command;
}

export function sendMessage(botKey: string, chatId: string, replyId: string, message: string) {
    request.post(getBotApiURL(botKey, "sendMessage"),
        {
            json: {
                method: "sendMessage",
                chat_id: chatId,
                text: message,
                parse_mode: "HTML",
                reply_to_message_id: replyId != null ? replyId : ""
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
};

export function sendPhoto(botKey: string, chatId: string, replyId: string, photoId: string) {
    request.post(getBotApiURL(botKey, "sendPhoto"),
        {
            json: {
                method: "sendPhoto",
                chat_id: chatId,
                photo: photoId,
                parse_mode: "HTML",
                reply_to_message_id: replyId != null ? replyId : ""
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
