import bent = require("bent");
import TelegramBot = require("node-telegram-bot-api");
import {RequestBody} from "bent";

function getBotApiURL(botKey: string, command: string): string {
    return `https://api.telegram.org/bot${botKey}/${command}`
}

async function RequestHead(url: string): Promise<number> {
    const head: bent.RequestFunction<any> = bent(url, 'HEAD', 'json', 200);
    const response = await head('');
    return response.status;
}

async function RequestPost(url: string, body: RequestBody, handle) : Promise<void>{
    const post: bent.RequestFunction<any> = bent(url, 'POST', 'json', 200);
    const response = await post('', body);

    handle(response.errorMessage, response, response.body)
}

export function executeIfUrlExist(url: string, onExist: () => void, onNotExist: () => void): void {
    RequestHead(url).then(status => {
        if(status.toString()[0] === "2"){
            onExist();
        }else{
            onNotExist();
        }
    });
}

function messageCallback(error, body, callback) {
    if (error) {
        console.log(error);
        return;
    }
    const response = (body && body.ok) ? (body.result as TelegramBot.Message) : null;
    console.log(`Res: ${response ? response.message_id : "Invalid Response"}`);
    if (callback) {
        callback(response);
    }
}

export function sendMessage(botKey: string, chatId: number, replyId: number, text: string, callBack: (res: TelegramBot.Message) => void = null, parseMode: string = "HTML"): void {
    RequestPost(getBotApiURL(botKey, "sendMessage"),
        {
            json: {
                method: "sendMessage",
                chat_id: chatId,
                text: text,
                parse_mode: parseMode,
                reply_to_message_id: replyId != null ? replyId : ""
            }
        }, (error, _res, body) => messageCallback(error, body, callBack));
}

export function editMessageText(botKey: string, chatId: number, messageId: number, text: string, callBack: (res: TelegramBot.Message) => void = null, parseMode: string = "HTML") {
    RequestPost(getBotApiURL(botKey, "editMessageText"),
        {
            json: {
                method: "deleteMessage",
                chat_id: chatId,
                message_id: messageId,
                parse_mode: parseMode,
                text: text
            }
        },
        (error, _res, body) => messageCallback(error, body, callBack));
}

export function deleteMessage(botKey: string, chatId: number, messageId: number) {
    RequestPost(getBotApiURL(botKey, "deleteMessage"),
        {
            json: {
                method: "deleteMessage",
                chat_id: chatId,
                message_id: messageId
            }
        },
        (error, _res, _body) => {
            if (error) {
                console.log(error);
                return;
            }
        });
}

export function sendPhoto(botKey: string, chatId: number, replyId: number, photoId: string, callBack: () => void = null): void {
    RequestPost(getBotApiURL(botKey, "sendPhoto"),
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
    RequestPost(getBotApiURL(botKey, "pinChatMessage"),
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
    RequestPost(requestUrl,
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
    RequestPost(requestUrl,
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