import express = require("express");
import FirebaseFirestore = require("@google-cloud/firestore");
import Bot from "./bot/bot";
import botInfo from './bot_info.json';
import bustabot from "./bot/bustabot/bustabot";
import jukebot from "./bot/jukebot/jukebot";
import BotInfoEntry from "./bot/types/bot_info_entry";

const bots: Array<Bot> = [
    bustabot,
    jukebot,
];

let isProd: boolean = false;

process.argv.forEach(function name(val, index, arr) {
    if (val === "prod") {
        isProd = true;
    }
})

function getBotData(botAlias: string): BotInfoEntry {
    let buildType = isProd ? "prod" : "dev";
    return botInfo[botAlias][buildType];
}

// Firestore integration
try {
    let db = new FirebaseFirestore.Firestore({
        projectId: botInfo["project-id"],
        keyFilename: "google_key.json",
    });

    // Initializes the bot with database
    bots.forEach(bot => {
        bot.init(db, getBotData(bot.botAlias))
    });
} catch (error) {
    console.log(error);
}

function handleProdApp() {
    console.log("Initializing app in production environment");
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
        app.get(`/${bot.botKey}`, (req, res) => {
            res
                .status(200)
                .send(`${bot.botName} is Working!`)
                .end();
        });

        // Actual bot requests.
        app.post(`/${bot.botKey}${bot.botName}`, (req, res) => {
            bot.handleTelegramMessage(req.body)
            res
                .status(200)
                .end();
        });

        bot.setWebhook(botInfo["host-url"]);
    });

    // Start the server
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`);
        console.log("Press Ctrl+C to quit.");
    });
}

function handleDevApp() {
    console.log("Initializing app in development environment");
    setInterval(() => {
        bots.forEach(bot => {
            bot.getUpdates();
        })
    }, 1000);
}

if (isProd) {
    handleProdApp();
} else {
    handleDevApp();
}