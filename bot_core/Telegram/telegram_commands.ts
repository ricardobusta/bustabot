import bent = require("bent");
import TelegramBot = require("node-telegram-bot-api");
import {RequestBody} from "bent";

function getBotApiURL(botKey: string, command: string): string {
    return `https://api.telegram.org/bot${botKey}/${command}`
}

async function RequestHead(url: string): Promise<any> {
    const head: bent.RequestFunction<any> = bent(url, 'HEAD', 'json', 200);
    return await head('');
}

async function RequestPost(url: string, body: RequestBody, handle) : Promise<void>{
    const post: bent.RequestFunction<any> = bent(url, 'POST', 'json', 200);
    const response: any = await post('', body);

    handle(response.errorMessage, response, response.body)
}

export function executeIfUrlExist(url: string, onExist: () => void, onNotExist: () => void): void {
    RequestHead(url).then((response): void => {
        if(response && response.statusCode.toString()[0] === "2"){
            onExist();
        }else{
            onNotExist();
        }
    });
}

function messageCallback(error, body, callback): void {
    if (error) {
        console.log(error);
        return;
    }
    const response: TelegramBot.Message = (body?.ok) ? (body.result as TelegramBot.Message) : null;
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
                reply_to_message_id: replyId ?? ""
            }
        }, (error, _res, body): void => messageCallback(error, body, callBack)).then();
}

export function editMessageText(botKey: string, chatId: number, messageId: number, text: string, callBack: (res: TelegramBot.Message) => void = null, parseMode: string = "HTML"): void {
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
        (error, _res, body): void => messageCallback(error, body, callBack)).then();
}

export function deleteMessage(botKey: string, chatId: number, messageId: number): void {
    RequestPost(getBotApiURL(botKey, "deleteMessage"),
        {
            json: {
                method: "deleteMessage",
                chat_id: chatId,
                message_id: messageId
            }
        },
        (error, _res, _body): void => {
            if (error) {
                console.log(error);
            }
        }).then();
}

export function sendPhoto(botKey: string, chatId: number, replyId: number, photoId: string, callBack: () => void = null): void {
    RequestPost(getBotApiURL(botKey, "sendPhoto"),
        {
            json: {
                method: "sendPhoto",
                chat_id: chatId,
                photo: photoId,
                parse_mode: "HTML",
                reply_to_message_id: replyId ?? ""
            }
        },
        (error, _res, body): void => {
            if (error) {
                console.log(error);
                return;
            }
            console.log(`Photo Sent:\n${body}`);
            if (callBack) {
                callBack();
            }
        }).then();
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
        (error, _res, body): void => {
            if (error) {
                console.log(error);
                return;
            }
            console.log(`Message pinned:\n${body}`);
            if (callBack) {
                callBack();
            }
        }).then();
}

export function setWebhook(url: string, botKey: string): void {
    let hookUrl: string = encodeURIComponent(`${url}/bot${botKey}`);
    let requestUrl: string = `${getBotApiURL(botKey, "setWebhook")}?url=${hookUrl}`;
    console.log(`With request url: ${requestUrl}`)
    RequestPost(requestUrl,
        {},
        (error, res, body): void => {
            if (error) {
                console.log(error);
                return;
            }
            if (res) {
                console.log(`Response: ${res.statusCode} ${res.statusMessage} ${body.toString()}`);
            }
        }).then();
}

export function setCommands(botKey: string, botCommands: Array<TelegramBot.BotCommand>): void {
    let requestUrl: string = `${getBotApiURL(botKey, "setMyCommands")}`;
    let commands: string = JSON.stringify(botCommands);
    console.log(`Setting bot commands: ${commands}`);
    RequestPost(requestUrl,
        {
            json: {
                method: "setMyCommands",
                commands: commands
            }
        },
        (error, res, body): void => {
            if (error) {
                console.log(error);
                return;
            }
            if (res) {
                console.log(`Response: ${res.statusCode} ${res.statusMessage} ${body.toString()}`);
            }
        }).then();
}