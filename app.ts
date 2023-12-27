const express = require('express');
import bustabot from './bustabot/bustabot';
import * as FirebaseFirestore from "@google-cloud/firestore";
import * as botKey from "./bot_key"
import Bot from './bot_core/Bot/bot';
import TelegramBot = require('node-telegram-bot-api');

let isProd: boolean = false;
const version_major: number = 1;
const version_minor: number = 2;
const version_patch: number = 0;
const version: string = `${version_major}.${version_minor}.${version_patch}`;

process.argv.forEach(function name(val, index, arr) {
    if (val === "prod") {
        isProd = true;
    }
})

const bots: Bot[] = [
    bustabot,
]

try {
    let db: FirebaseFirestore.Firestore = new FirebaseFirestore.Firestore({
        projectId: botKey.projectId,
        keyFilename: "google_key.json",
    });

    bustabot.init(db, botKey.bustabot, botKey.webhook, version);
} catch (error) {
    console.log(error);
}

if (isProd) {
    const app = express();

    app.use(express.json());

    // Default request. Just to check if the bot is up.
    app.get("/", (req, res) => {
        res
            .status(200)
            .send(version)
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
        app.post(`/bot${bot.botKey}`, (req, res) => {
            bot.handleTelegramUpdate(req.body as TelegramBot.Update)
            res
                .status(200)
                .end();
        });
    });

    // Start the server
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        for(let i=0;i<50;i++){
            console.log("\n");
        }
        console.log("=========================================");
        console.log("=");
        console.log("=   STARTING NEW BOT RUN ver " + version);
        console.log("=");
        console.log("=========================================");
        console.log(`App listening on port ${PORT}`);
        console.log("Press Ctrl+C to quit.");
    });
}
