import telegramCommands = require("../../bot_core/Telegram/telegram_commands");
import BotCommand from "../../bot_core/Bot/bot_command";
import BotExecuteContext from "../../bot_core/Bot/bot_execute_data";
import TelegramBot = require("node-telegram-bot-api");
import * as botKey from "../../bot_key";

const request = require("request");

const headers = {
    'Authorization': 'Token ' + botKey.replicateApiToken,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

const apiUrl = "https://api.replicate.com/v1/predictions";

class PokeUrls {
    get: string;
    cancel: string;
}

class PokeInput {
    prompt: string;
    num_outputs: number;
    num_inference_steps: number;
    guidance_scale: number;
}

class PokeResponse {
    id: string;
    version: string;
    urls: PokeUrls;
    created_at: string;
    completed_at: string;
    status: string;
    input: PokeInput;
    output: string;
    error: string;
}

class FinalResponse {
    id: string;
    version: string;
    urls: PokeUrls;
    created_at: string;
    completed_at: string;
    status: string;
    input: PokeInput;
    output: Array<string>;
    error: string;
    logs: string;
    metrics: {
        predict_time: number;
    }
}

function GenRequestBody(prompt: string): string {
    let body: PokeInput = {
        prompt: prompt,
        num_outputs: 1,
        num_inference_steps: 50,
        guidance_scale: 7.5
    };
    return '{"version": "3554d9e699e09693d3fa334a79c58be9a405dd021d3e11281256d53185868912", "input":' +
        JSON.stringify(body) + '}';
}

let executing : boolean = false;

class Poke extends BotCommand {
    keys = ["poke", "pok", "po", "p"];
    description = "Generate pokemon with the power of AI";
    execute = function (ctx: BotExecuteContext): void {
        function sendMessage(msg: string, callback: (res: TelegramBot.Message) => void = null) {
            telegramCommands.sendMessage(
                ctx.botKey,
                ctx.message.chat.id,
                null,
                msg,
                callback
            );
        }

        function editMessage(msgId: number, msg: string) {
            telegramCommands.editMessageText(
                ctx.botKey,
                ctx.message.chat.id,
                msgId,
                msg
            );
        }

        function debug(msg: string){
            console.log(msg);
        }

        if (ctx.params.length < 2) {
            sendMessage("Input something.");
            return;
        }

        if(this.executing){
            sendMessage("Bot is currently processing something. Wait a moment.");
            return;
        }

        executing = true;

        let prompt = ctx.message.text.substring(ctx.params[0].length, ctx.params[0].length + 20).trim();

        let baseMsg = "Prompt: <i>" + prompt + "</i>. Status: ";
        let count = 0;

        sendMessage(baseMsg + "processing. " + count, (res) => {
            let msgId = res.message_id;

            request.post({url: apiUrl, headers: headers, body: GenRequestBody(prompt)},
                (error, res, body) => {
                    if (error) {
                        console.log(error);
                        return;
                    }

                    if (!body) {
                        console.log("response body is invalid");
                        return;
                    }

                    count++;
                    editMessage(msgId, baseMsg + "processing. " + count);

                    const response: PokeResponse = JSON.parse(body);

                    function TryGetResult() {
                        request.get(
                            {url: response.urls.get, headers: headers},
                            (error, res, body) => {
                                let finalResponse: FinalResponse = JSON.parse(body);

                                count++;
                                if (finalResponse.status == "processing") {
                                    if (count < 1000) {
                                        editMessage(msgId, baseMsg + finalResponse.status + ". " + count);
                                        setTimeout(TryGetResult, 1000); // retry
                                    } else {
                                        executing = false;
                                        editMessage(msgId, baseMsg + "failed.");
                                    }
                                } else {
                                    executing = false;
                                    if(finalResponse.status == "succeeded") {
                                        editMessage(msgId, baseMsg + "success");
                                        telegramCommands.sendPhoto(ctx.botKey, ctx.message.chat.id, msgId, finalResponse.output[0])
                                    }else{
                                        editMessage(msgId, baseMsg + "fail");
                                        debug(body);
                                    }
                                }
                            }
                        );
                    }

                    TryGetResult();
                });
        });
    }
}

export default new Poke();