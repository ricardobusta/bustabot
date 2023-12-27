import BotCommand from "../../bot_core/Bot/bot_command";
import BotExecuteContext from "../../bot_core/Bot/bot_execute_data";

const first_names: string[] = [
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

const last_names: string[] = [
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
    keys: string[] = ["benedict"];
    description: string = "Descubra seu nome Benedict Cumberbatch.";
    execute: (ctx: BotExecuteContext) => void = function (ctx: BotExecuteContext): void {
        let fn: number = Math.floor(Math.random() * first_names.length);
        let ln: number = Math.floor(Math.random() * last_names.length);

        let userName: string = ctx.message.from.first_name;
        let result: string = `${first_names[fn]} ${last_names[ln]}`;

        this.telegram.SendMessage(
            ctx.botKey,
            ctx.message.chat.id,
            ctx.message.message_id,
            `O nome Benedict Cumberbatch de ${userName} é <code>${result}</code>!`);
    }
}

export default new Benedict();