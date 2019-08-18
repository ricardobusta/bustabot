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

const syllabes = [
    "ta", "te", "ti", "to", "tu",
    "ja", "je", "ji", "jo", "ju",
    "an", "en", "in", "on", "un",
    "ka", "ke", "ki", "ko", "ku",
    "ra", "re", "ri", "ro", "ru",
    "pa", "pe", "pi", "po", "pu",
    "sha", "she", "shi", "sho", "shu",
    "gan", "gen", "gin", "gon", "gun",
    "tam", "tem", "tim", "tom", "tum",
    "wan", "wen", "win", "won", "wun",
    "ha", "he", "hi", "ho", "hu",
    "ya", "ye", "yi", "yo", "yu",
    "'", "'", "'", "'", "'",
    "ph", "kh", "gh", "th", "ch",
    "x", "k",
    "cca", "cce", "cci", "cco", "ccu",
    "aa", "ee", "ii", "oo", "uu",
    "da", "de", "di", "do", "du"
]

function getRange(rng, min, max) {
    return min + Math.floor(rng * (max - min + 1));
}

function getArrayRange(rng, arr) {
    return arr[Math.floor(rng * arr.length)];
}

function getAttribute(rng) {
    return getRange(rng, 1, 10);
}

function firstLetterUcase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
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

        let genName = (function () {
            let nameSyllabes = getRange(nameCountRng, 1, 6);
            let surnameSyllabes = getRange(surameCountRng, 1, 6);

            let name = "";

            for (let i = 0; i < nameSyllabes; i++) {
                name += getArrayRange(rng(), syllabes);
            }
            name = firstLetterUcase(name);

            let surname = "";
            for (let i = 0; i < surnameSyllabes; i++) {
                surname += getArrayRange(rng(), syllabes);
            }
            surname = firstLetterUcase(surname);
            return name + " " + surname;
        })();

        let message =
            "Jogador: " + userName + "\n" +
            "Personagem: " + genName + "\n" +
            "Classe:" + getArrayRange(charClassRng, classes)[0] + "\n" +
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