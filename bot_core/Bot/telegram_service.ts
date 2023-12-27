import RequestService from "./request_service";
import * as TelegramBot from "node-telegram-bot-api";

class TelegramService {
    request: RequestService;

    constructor(request: RequestService) {
        this.request = request;
    }

    GetBotApiURL(botKey: string, command: string): string {
        return `https://api.telegram.org/bot${botKey}/${command}`;
    }

    MessageCallback(error, res, callback): void {
        if (error) {
            console.log(error);
            return;
        }
        const response: TelegramBot.Message = (res.ok) ? (res.result as TelegramBot.Message) : null;
        console.log(`Res: ${response ? response.message_id : "Invalid Response"}`);
        if (callback) {
            callback(response);
        }
    }

    SendMessage(botKey: string, chatId: number, replyId: number, text: string, callBack: (res: TelegramBot.Message) => void = null, parseMode: string = "HTML"): void {
        this.request.Post(this.GetBotApiURL(botKey, "sendMessage"), {
            method: "sendMessage",
            chat_id: chatId,
            text: text,
            parse_mode: parseMode,
            reply_to_message_id: replyId ?? ""
        }, (error, res): void => this.MessageCallback(error, res, callBack)).then();
    }

    EditMessageText(botKey: string, chatId: number, messageId: number, text: string, callBack: (res: TelegramBot.Message) => void = null, parseMode: string = "HTML"): void {
        this.request.Post(this.GetBotApiURL(botKey, "editMessageText"),
            {
                method: "deleteMessage",
                chat_id: chatId,
                message_id: messageId,
                parse_mode: parseMode,
                text: text
            },
            (error, res): void => this.MessageCallback(error, res, callBack)).then();
    }

    DeleteMessage(botKey: string, chatId: number, messageId: number): void {
        this.request.Post(this.GetBotApiURL(botKey, "deleteMessage"),
            {
                method: "deleteMessage",
                chat_id: chatId,
                message_id: messageId
            },
            (error, _res): void => {
                if (error) {
                    console.log(error);
                }
            }).then();
    }

    SendPhoto(botKey: string, chatId: number, replyId: number, photoId: string, callBack: () => void = null): void {
        this.request.Post(this.GetBotApiURL(botKey, "sendPhoto"),
            {
                method: "sendPhoto",
                chat_id: chatId,
                photo: photoId,
                parse_mode: "HTML",
                reply_to_message_id: replyId ?? ""
            },
            (error, res): void => {
                if (error) {
                    console.log(error);
                    return;
                }
                console.log(`Photo Sent:\n${JSON.stringify(res)}`);
                if (callBack) {
                    callBack();
                }
            }).then();
    }

    PinMessage(botKey: string, chatId: number, messageId: number, disableNotification: boolean, callBack: () => void = null): void {
        this.request.Post(this.GetBotApiURL(botKey, "pinChatMessage"),
            {
                method: "pinChatMessage",
                chat_id: chatId,
                message_id: messageId,
                disable_notification: disableNotification,
            },
            (error, res): void => {
                if (error) {
                    console.log(error);
                    return;
                }
                console.log(`Message pinned:\n${res}`);
                if (callBack) {
                    callBack();
                }
            }).then();
    }

    async SetWebhook(url: string, botKey: string): Promise<void> {
        let hookUrl: string = encodeURIComponent(`${url}/bot${botKey}`);
        let requestUrl: string = `${this.GetBotApiURL(botKey, "setWebhook")}?url=${hookUrl}`;
        console.log(`Set Webhook with request url: ${requestUrl}`)
        this.request.Post(requestUrl,
            {},
            (error, res): void => {
                if (error) {
                    console.log(error);
                    return;
                }
                if (res) {
                    console.log(`Set Webhook Response: ${res.ok}`);
                }
            }).then();
    }

    SetCommands(botKey: string, botCommands: Array<TelegramBot.BotCommand>): void {
        let requestUrl: string = `${this.GetBotApiURL(botKey, "setMyCommands")}`;
        let commands: string = JSON.stringify(botCommands);
        console.log(`Set Commands with request url: ${requestUrl}`)
        this.request.Post(requestUrl,
            {
                method: "setMyCommands",
                commands: commands
            },
            (error, res): void => {
                if (error) {
                    console.log(error);
                    return;
                }
                if (res) {
                    console.log(`Set Commands Response: ${res.ok}`);
                }
            }).then();
    }
}

export default TelegramService;