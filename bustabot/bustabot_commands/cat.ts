import telegramCommands = require("../../bot_core/Telegram/telegram_commands");
import BotCommand from "../../bot_core/Bot/bot_command";
import BotExecuteContext from "../../bot_core/Bot/bot_execute_data";

const status: number[] = [
    100, 101, 200, 201, 202, 204, 206, 207, 300, 301, 302, 303, 304,
    305, 307, 400, 401, 402, 403, 404, 405, 406, 408, 409, 410, 411,
    412, 413, 414, 415, 416, 417, 418, 420, 421, 422, 423, 424, 425,
    426, 429, 431, 444, 450, 451, 500, 504, 506, 507, 508, 509, 510,
    511, 599
];

class Cat extends BotCommand {
    keys: string[] = ["cat"];
    description: string = "Returns a HTTP status cat.";
    execute: (ctx: BotExecuteContext) => Promise<void> = async function (ctx: BotExecuteContext): Promise<void> {
        if (ctx.params.length > 2) {
            telegramCommands.sendMessage(
                ctx.botKey,
                ctx.message.chat.id,
                ctx.message.message_id,
                "Too many parameters.");
            return;
        }

        let code: number;
        if (ctx.params.length == 2) {
            code = parseInt(ctx.params[1]);
        } else {
            code = status[Math.floor(Math.random() * status.length)]
        }

        let url: string = `https://http.cat/${code}`;

        if(await telegramCommands.IsValidUrl(url)){
            telegramCommands.sendPhoto(
                ctx.botKey,
                ctx.message.chat.id,
                ctx.message.message_id,
                url);
        }else{
            telegramCommands.sendMessage(
                ctx.botKey,
                ctx.message.chat.id,
                ctx.message.message_id,
                "404 cat not found");
        }
    }

}

export default new Cat();