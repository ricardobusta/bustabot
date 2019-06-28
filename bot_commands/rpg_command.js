const telegramCommands = require('../bot_core/telegram_commands');
var seedrandom = require('seedrandom');

var classes = [
    ["Mago", "https://pt.wikipedia.org/wiki/Mago_(RPG)"],
    ["Ladino", "https://pt.wikipedia.org/wiki/Ladino_(classe_de_personagem)"],
    ["Druida", "https://pt.wikipedia.org/wiki/Druida_(RPG)"],
    ["Ranger", "https://pt.wikipedia.org/wiki/Ranger_(classe_de_personagem)"],
    ["Clérigo", "https://pt.wikipedia.org/wiki/Cl%C3%A9rigo_(classe_de_personagem)"],
    ["Paladino", "https://pt.wikipedia.org/wiki/Paladino_(classe_de_personagem)"],
    ["Feiticeiro", "https://pt.wikipedia.org/wiki/Feiticeiro_(RPG)"],
    ["Bárbaro", "https://pt.wikipedia.org/wiki/B%C3%A1rbaro_(RPG)"],
    ["Monge", "https://pt.wikipedia.org/wiki/Monge_(RPG)"],
    ["Bardo", "https://pt.wikipedia.org/wiki/Bardo_(RPG)"],
    ["Dançarino", "https://pt.wikipedia.org/wiki/Dan%C3%A7a"],
    ["Mendigo", "https://pt.wikipedia.org/wiki/Mendigo"],
    ["Algoz", "https://pt.wikipedia.org/wiki/Antipaladino"],
    ["Alquimista", "https://pt.wikipedia.org/wiki/Alquimista_(classe_de_personagem)"],
    ["Cavaleiro", "https://pt.wikipedia.org/wiki/Cavaleiro_(RPG)"],
]

function getAttribute(rng) {
    return 1 + Math.floor(rng * 10);
}

module.exports = {
    keys: ["rpg"],
    description: "Gera seu personagem de RPG",
    execute: function (params, req) {
        var userName = req.message.from.first_name;

        // Keep like this to avoid changing values when changing the text format and order.
        var rng = seedrandom(req.message.from.id);
        var charClassRng = rng();
        var strRng = rng();
        var dexRng = rng();
        var conRng = rng();
        var intRng = rng();
        var wisRng = rng();
        var chaRng = rng();

        var message =
            "Jogador: " + userName + "\n" +
            "Personagem: RANDOM NAME\n" +
            "Classe:" + classes[Math.floor(charClassRng * classes.length)][0] + "\n" +
            "Atributos: \n" +
            "  STR " + getAttribute(strRng) + "\n" +
            "  DEX " + getAttribute(dexRng) + "\n" +
            "  CON " + getAttribute(conRng) + "\n" +
            "  INT " + getAttribute(intRng) + "\n" +
            "  WIS " + getAttribute(wisRng) + "\n" +
            "  CHA " + getAttribute(chaRng);

        console.log(message);

        telegramCommands.sendMessage(
            req.message.chat.id,
            message);
    }
}