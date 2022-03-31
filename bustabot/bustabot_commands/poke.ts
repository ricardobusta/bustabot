import TelegramBot = require("node-telegram-bot-api");
import telegramCommands = require("../../bot_core/Telegram/telegram_commands");
import BotCommand from "../../bot_core/Bot/bot_command";
import BotExecuteContext from "../../bot_core/Bot/bot_execute_data";

const date0 = new Date(2022, 2, 31); // Jan is month 0

const pokeCommandDocument = "poke";

class PokeData {
    lastSentMessage: number;
    dayIndex: number;
    guesses: string;
    players: string;
    wordOverride: string;
}

class Poke extends BotCommand {
    keys = ["poke", "pok", "po", "p"];
    description = "Guess the pokemon";
    execute = function (ctx: BotExecuteContext): void {
        const now = new Date(Date.now());
        const dateDiff = now.getTime() - date0.getTime();

        let document = ctx.data.doc(`${pokeCommandDocument}[${ctx.message.chat.id}]`);
        document.get()
            .then(doc => {
                let data: PokeData = doc.exists ? doc.data() as PokeData : new PokeData();

                // if (todayIndex > data.dayIndex) {
                //     data = new WordData();
                //     data.dayIndex = todayIndex;
                //     data.lastSentMessage = null;
                //     data.wordOverride = "";
                // }
            });
    }
}

export default new Poke();