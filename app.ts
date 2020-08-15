import * as express from 'express';
import Bot from "./bot_core/Bot/bot";
import bustabot from './bustabot/bustabot';
import jukebot from './jukebot/jukebot';
import BotInfo from './bot_core/Bot/bot_info';

let isProd: boolean = false;

process.argv.forEach(function name(val, index, arr) {
    if (val === "prod") {
        isProd = true;
    }
})

const bots: Array<Bot> = [
    bustabot,
    jukebot
];

bots.forEach(bot => {
    bot.init(db, BotInfo[isProd ? "prod" : "dev"][bot.botAlias]);
});

if (isProd) {
    const app = express();

    app.use(express.json());

    // Default request. Just to check if the bot is up.
    app.get("/", (req, res) => {
        res
            .status(200)
            .send("Hello, world!")
            .end();
    });

    bots.forEach(bot => {
        if (!bot.initialized) {
            return;
        }
        // Check if the proper key is set. Just make a request with the bot key appended.
        app.get("/" + bot.botKey, (req, res) => {
            res
                .status(200)
                .send(`${bot.botName} is Working!`)
                .end();
        });

        // Actual bot requests.
        app.post(`/${bot.botName}`, (req, res) => {
            bot.handleTelegramMessage(req.body)
            res
                .status(200)
                .end();
        });
    });

    // Start the server
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`);
        console.log("Press Ctrl+C to quit.");
    });
} else {

}
