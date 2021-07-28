import request = require("request");
import TelegramBot = require("node-telegram-bot-api");

function getBotApiURL(botKey: string, command: string) {
    return `https://api.telegram.org/bot${botKey}/${command}`
}

export function executeIfUrlExist(url: string, onExist: () => void, onNotExist: () => void): void {
    const urlExists = checkUrl => new Promise((resolve, reject) =>
        request.head(checkUrl).on("response", res => resolve(res.statusCode.toString()[0] === "2")));

    urlExists(url).then(exists => {
        if (exists) {
            onExist();
        } else {
            onNotExist();
        }
    });
};

export function sendMessage(botKey: string, chatId: number, replyId: number, text: string, callBack: () => void = null): void {
    request.post(getBotApiURL(botKey, "sendMessage"),
        {
            json: {
                method: "sendMessage",
                chat_id: chatId,
                text: text,
                parse_mode: "HTML",
                reply_to_message_id: replyId != null ? replyId : ""
            }
        },
        (error, res, body) => {
            if (error) {
                console.log(error);
                return;
            }
            var msg = body.toString();
            console.log("Res: " + msg);
            if (callBack) {
                callBack();
            }
        });
};

export function sendPhoto(botKey: string, chatId: number, replyId: number, photoId: string, callBack: () => void = null): void {
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
        (error, _res, body) => {
            if (error) {
                console.log(error);
                return;
            }
            console.log(`Photo Sent:\n${body}`);
            if (callBack) {
                callBack();
            }
        });
}

export function pinMessage(botKey: string, chatId: number, messageId: number, disableNotification: boolean, callBack: () => void = null): void {
    request.post(getBotApiURL(botKey, "pinChatMessage"),
        {
            json: {
                method: "pinChatMessage",
                chat_id: chatId,
                message_id: messageId,
                disable_notification: disableNotification,
            }
        },
        (error, _res, body) => {
            if (error) {
                console.log(error);
                return;
            }
            console.log(`Message pinned:\n${body}`);
            if (callBack) {
                callBack();
            }
        });
}

export function setWebhook(url: string, botKey: string) {
    let hookUrl = encodeURIComponent(`${url}/bot${botKey}`);
    let requestUrl = `${getBotApiURL(botKey, "setWebhook")}?url=${hookUrl}`;
    console.log(`With request url: ${requestUrl}`)
    request.post(requestUrl,
        {},
        (error, res, body) => {
            if (error) {
                console.log(error);
                return;
            }
            if (res) {
                console.log(`Response: ${res.statusCode} ${res.statusMessage} ${body.toString()}`);
            }
        });
}

export function setCommands(botKey: string, botCommands: Array<TelegramBot.BotCommand>) {
    let requestUrl = `${getBotApiURL(botKey, "setMyCommands")}`;
    let commands = JSON.stringify(botCommands);
    console.log(`Setting bot commands: ${commands}`);
    request.post(requestUrl,
        {
            json: {
                method: "setMyCommands",
                commands: commands
            }
        },
        (error, res, body) => {
            if (error) {
                console.log(error);
                return;
            }
            if (res) {
                console.log(`Response: ${res.statusCode} ${res.statusMessage} ${body.toString()}`);
            }
        });
}