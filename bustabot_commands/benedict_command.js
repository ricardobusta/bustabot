const telegramCommands = require("../bot_core/telegram_commands");

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

module.exports = {
    keys: ["benedict"],
    description: "Descubra seu nome Benedict Cumberbatch.",
    execute: function (key, params, req) {
        let fn = Math.floor(Math.random() * first_names.length);
        let ln = Math.floor(Math.random() * last_names.length);

        let userName = req.message.from.first_name;
        let result = first_names[fn] + " " + last_names[ln];

        telegramCommands.sendMessage(
            key, 
            req.message.chat.id,
            "O nome Benedict Cumberbatch de " +
            userName +
            " é <code>" +
            result +
            "</code>!");
    }
}