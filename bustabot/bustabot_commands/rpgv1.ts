import TelegramBot = require("node-telegram-bot-api");

let seedrandom: any = require("seedrandom");

const syllabes: string[] = [
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
    "'", "ptu", "xhu", "'", "'",
    "ph", "kh", "gh", "th", "ch",
    "x", "k",
    "cca", "cce", "cci", "cco", "ccu",
    "aa", "ee", "ii", "oo", "uu",
    "da", "de", "di", "do", "du"
];

function getRange(rng, min, max): any {
    return min + Math.floor(rng * (max - min + 1));
}

function getArrayRange(rng, arr): any {
    return arr[Math.floor(rng * arr.length)];
}

function getAttribute(rng): any {
    return getRange(rng, 1, 10);
}

function firstLetterUcase(str): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

class RpgV1 {
    execute(message: TelegramBot.Message, races, classes): string {
        let userName: string = message.from.first_name;

        // Keep like this to avoid changing values when changing the text format and order.
        let rng: any = seedrandom(message.from.id);
        let charClassRng: any = rng();
        let strRng: any = rng();
        let dexRng: any = rng();
        let conRng: any = rng();
        let intRng: any = rng();
        let wisRng: any = rng();
        let chaRng: any = rng();

        let nameCountRng: any = rng();
        let surameCountRng: any = rng();

        let genName: string = (function (): string {
            let nameSyllabes: any = getRange(nameCountRng, 1, 6);
            let surnameSyllabes: any = getRange(surameCountRng, 1, 6);

            let name: string = "";

            for (let i = 0; i < nameSyllabes; i++) {
                name += getArrayRange(rng(), syllabes);
            }
            name = firstLetterUcase(name);

            let surname: string = "";
            for (let i = 0; i < surnameSyllabes; i++) {
                surname += getArrayRange(rng(), syllabes);
            }
            surname = firstLetterUcase(surname);
            return name + " " + surname;
        })();

        let ageRng: any = rng();
        let raceRng: any = rng();

        let raceInfo: any = getArrayRange(raceRng, races);

        let text: string = "FICHA DO PERSONAGEM\n" +
            "<b>Jogador:</b> " + userName + "\n" +
            "<b>Personagem:</b> " + genName + "\n" +
            "<b>Raça:</b> " + raceInfo.name + "\n" +
            "<b>Classe:</b> " + getArrayRange(charClassRng, classes).name + "\n" +
            "<b>Idade:</b> " + getRange(ageRng, raceInfo.min_age, raceInfo.max_age) + "\n" +
            "<b>Atributos:</b> \n" +
            "💪 <b>STR:</b> " + getAttribute(strRng) + "\n" +
            "💨 <b>DEX:</b> " + getAttribute(dexRng) + "\n" +
            "🔋 <b>CON:</b> " + getAttribute(conRng) + "\n" +
            "🧠 <b>INT:</b> " + getAttribute(intRng) + "\n" +
            "📖 <b>WIS:</b> " + getAttribute(wisRng) + "\n" +
            "💋 <b>CHA:</b> " + getAttribute(chaRng) + "";
        return text;
    }
}

export default new RpgV1();