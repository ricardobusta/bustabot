import telegramCommands = require("../../bot_core/Telegram/telegram_commands");
import BotCommand from "../../bot_core/Bot/bot_command";
import TelegramBot = require("node-telegram-bot-api");
import BotExecuteContext from "../../bot_core/Bot/bot_execute_data";

const first_names = [
    "Blubberbutt",
    "Benedict",
    "Benadryl",
    "Benchthis",
    "Bonapart",
    "Brokenbrick",
    "Boppinstick",
    "Benefit",
    "Scissorkick",
    "Backitup",
    "Beezlebub",
    "Burgerking",
    "Blenderdick",
    "Billiardball",
    "Guiltyveredict",
    "Beanbag",
    "Carrotstick",
    "Brodyquest",
    "Beachbody",
    "Bendylick",
    "Baseballmitt",
    "Bedbug",
    "Bunsenburner",
    "Bengaltiger",
    "Budapest",
    "Handpicked"];

const last_names = [
    "Calldispatch",
    "Comedicmismatch",
    "Cunningscratch",
    "Cumberfinch",
    "Humperdinck",
    "Lumberlatch",
    "Flubbercrack",
    "Cumberbatch",
    "Bandersnatch",
    "Cuttlefish",
    "Slumberbelch",
    "Cupboardlatch",
    "Combyourhatch",
    "Thundermunch",
    "Cricketbat",
    "Johnnycash",
    "Comelycat",
    "Custardbath",
    "Thundercats",
    "Numbercrunch",
    "Luckycatch",
    "Covertrack",
    "Uptoscratch",
    "Compasstrap",
    "Chunkybap",
    "Candygram"];

class Benedict extends BotCommand {
    keys = ["benedict"];
    description = "Descubra seu nome Benedict Cumberbatch.";
    execute = function (ctx: BotExecuteContext): void {
        let fn = Math.floor(Math.random() * first_names.length);
        let ln = Math.floor(Math.random() * last_names.length);

        let userName = ctx.message.from.first_name;
        let result = `${first_names[fn]} ${last_names[ln]}`;

        telegramCommands.sendMessage(
            ctx.botKey,
            ctx.message.chat.id,
            ctx.message.message_id,
            `O nome Benedict Cumberbatch de ${userName} é <code>${result}</code>!`);
    }
}

export default new Benedict();