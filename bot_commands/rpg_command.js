const telegramCommands = require('../bot_core/telegram_commands');
let seedrandom = require('seedrandom');

const classes = [
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

function getRange(rng, min, max) {
    return min + Math.floor(rng * (max - min + 1));
}

function getAttribute(rng) {
    return getRange(rng, 1, 10);
}

module.exports = {
    keys: ["rpg"],
    description: "Gera seu personagem de RPG",
    execute: function (params, req) {
        let userName = req.message.from.first_name;

        // Keep like this to avoid changing values when changing the text format and order.
        let rng = seedrandom(req.message.from.id);
        let charClassRng = rng();
        let strRng = rng();
        let dexRng = rng();
        let conRng = rng();
        let intRng = rng();
        let wisRng = rng();
        let chaRng = rng();

        let nameCountRng = rng();
        let surameCountRng = rng();

        let message =
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