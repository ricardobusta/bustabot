import BotCommand from "../../bot_core/Bot/bot_command";
import Random from "../../bot_core/random";
import BotExecuteContext from "../../bot_core/Bot/bot_execute_data";
import RpgV1 from "./rpgv1";

type CharJob = { name: string, url: string };
type CharRace = { name: string, min_age: number, max_age: number };
type CharAttributes = Array<number>;
type GeneratorOutput = {
    version: number,
    race: CharRace,
    job: CharJob,
    age: number,
    attributes: CharAttributes,
    name: string
};

const classes: Array<CharJob> = [
    {name: "🧙‍ Mago", url: "https://pt.wikipedia.org/wiki/Mago_(RPG)"},
    {name: "🗡️ Ladino", url: "https://pt.wikipedia.org/wiki/Ladino_(classe_de_personagem)"},
    {name: "🐺 Druida", url: "https://pt.wikipedia.org/wiki/Druida_(RPG)"},
    {name: "🏹 Ranger", url: "https://pt.wikipedia.org/wiki/Ranger_(classe_de_personagem)"},
    {name: "✝️ Clérigo", url: "https://pt.wikipedia.org/wiki/Cl%C3%A9rigo_(classe_de_personagem)"},
    {name: "🛡️ Paladino", url: "https://pt.wikipedia.org/wiki/Paladino_(classe_de_personagem)"},
    {name: "🧙‍♀️ Feiticeiro", url: "https://pt.wikipedia.org/wiki/Feiticeiro_(RPG)"},
    {name: "⚔️ Bárbaro", url: "https://pt.wikipedia.org/wiki/B%C3%A1rbaro_(RPG)"},
    {name: "☯️ Monge", url: "https://pt.wikipedia.org/wiki/Monge_(RPG)"},
    {name: "🎸 Bardo", url: "https://pt.wikipedia.org/wiki/Bardo_(RPG)"},
    {name: "💃 Dançarino", url: "https://pt.wikipedia.org/wiki/Dan%C3%A7a"},
    {name: "💸 Mendigo", url: "https://pt.wikipedia.org/wiki/Mendigo"},
    {name: "🗡️ Algoz", url: "https://pt.wikipedia.org/wiki/Antipaladino"},
    {name: "⚗️ Alquimista", url: "https://pt.wikipedia.org/wiki/Alquimista_(classe_de_personagem)"},
    {name: "🐴 Cavaleiro", url: "https://pt.wikipedia.org/wiki/Cavaleiro_(RPG)"},
];

const races: Array<CharRace> = [
    {name: "Humano", min_age: 12, max_age: 90},
    {name: "Anão", min_age: 18, max_age: 350},
    {name: "Elfo", min_age: 100, max_age: 750},
    {name: "Halfling", min_age: 20, max_age: 250},
    {name: "Gnomo", min_age: 20, max_age: 400},
    {name: "Meio Orc", min_age: 14, max_age: 75},
    {name: "Meio Elfo", min_age: 20, max_age: 18}
];

const syllabes: Array<string> = [
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
    "'", "ptu", "xhu", "'d", "'ta",
    "ph", "kh", "gh", "th", "ch",
    "x", "k",
    "cca", "cce", "cci", "cco", "ccu",
    "aa", "ee", "ii", "oo", "uu",
    "da", "de", "di", "do", "du"
];

function firstLetterUcase(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function generateCharV2(seed: number): GeneratorOutput {
    let seedStr: string = seed.toString();
    let statRng: Random = new Random(seedStr);
    let attributes: CharAttributes = new Array<number>(6);
    let totalAtrib: number = statRng.getRangeInt(25, 35);
    for (let i = 0; i < totalAtrib; i++) {
        attributes[i] = statRng.getRangeInt(1, 10);
    }

    let infoRng: Random = new Random(seedStr);
    let job: CharJob = infoRng.getArrayRange(classes);
    let race: CharRace = infoRng.getArrayRange(races);
    let age: number = infoRng.getRangeInt(race.min_age, race.max_age);

    let nameRng: Random = new Random(seedStr);

    let transform: (t: number) => number = function (t: number): number {
        return Math.sin(t * Math.PI);
    };
    let nameSyllabes: number = nameRng.getTransformInt(1, 5, transform);
    let surnameSyllabes: number = nameRng.getTransformInt(1, 5, transform);

    let firstName: string = "";
    for (let i = 0; i < nameSyllabes; i++) {
        firstName += nameRng.getArrayRange(syllabes);
    }
    firstName = firstLetterUcase(firstName);

    let secondName: string = "";
    for (let i = 0; i < surnameSyllabes; i++) {
        secondName += nameRng.getArrayRange(syllabes);
    }
    secondName = firstLetterUcase(secondName);
    let name: string = `${firstName} ${secondName}`;
    return {version: 2, race, job, age, attributes, name}
}

class Rpg extends BotCommand {
    keys: string[] = ["rpg", "rpgv1", "rpgv2"];
    description: string = "Gera seu personagem de RPG";

    rpgv1: RpgV1 = new RpgV1();

    async Execute(ctx: BotExecuteContext): Promise<void> {
        let text: string;
        if (ctx.commandKey == "rpgv1") {
            text = this.rpgv1.execute(ctx.message, races, classes);
        } else {
            let userName: string = ctx.message.from.first_name;

            let {version, race, job, age, attributes, name}: GeneratorOutput = generateCharV2(ctx.message.from.id);

            text = `FICHA DO PERSONAGEM (v${version})\n` +
                `<b>Jogador:</b> ${userName}\n` +
                `<b>Personagem:</b> ${name}\n` +
                `<b>Raça:</b> ${race.name}\n` +
                `<b>Classe:</b> ${job.name}\n` +
                `<b>Idade:</b> ${age}\n` +
                "<b>Atributos: </b>\n" +
                `💪 <b>STR: </b> ${attributes[0]}\n` +
                `💨 <b>DEX: </b> ${attributes[1]}\n` +
                `🔋 <b>CON: </b> ${attributes[2]}\n` +
                `🧠 <b>INT: </b> ${attributes[3]}\n` +
                `📖 <b>WIS: </b> ${attributes[4]}\n` +
                `💋 <b>CHA: </b> ${attributes[5]}\n`;

            console.log(text);
        }

        this.telegram.SendMessage(
            ctx.botKey,
            ctx.message.chat.id,
            ctx.message.message_id,
            text
        );
    }
}

export default Rpg;