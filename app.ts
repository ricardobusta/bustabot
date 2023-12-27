const express: any = require('express');
import * as FirebaseFirestore from "@google-cloud/firestore";
import * as botKey from "./bot_key"
import Bot from './bot_core/Bot/bot';
import TelegramBot = require('node-telegram-bot-api');
import bustabot from './bustabot/bustabot';

const version_major: number = 1;
const version_minor: number = 2;
const version_patch: number = 0;
const version: string = `${version_major}.${version_minor}.${version_patch}`;

function CheckIsProd(): boolean {
    let isProd: boolean = false;
    process.argv.forEach(function name(val: string, _index: number, _arr: string[]): void {
        if (val === "prod") {
            isProd = true;
        }
    })
    return isProd;
}

const isProd: boolean = CheckIsProd();

const bots: Bot[] = [
    bustabot,
]

function GetFirebaseDatabase(): FirebaseFirestore.Firestore {
    let db: FirebaseFirestore.Firestore = new FirebaseFirestore.Firestore({
        projectId: botKey.projectId,
        keyFilename: "google_key.json",
    });
    return db;
}

try {
    let db = GetFirebaseDatabase();

    if (isProd) {
        bustabot.init(db, botKey.bustabot, botKey.webhook, version);
    } else {
        bustabot.init(db, botKey.dev_bustabot, botKey.dev_webhook, version);
    }
} catch (error) {
    console.log(error);
}

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
const PORT: string | number = process.env.PORT || 18080;
app.listen(PORT, () => {
    console.log("=========================================");
    console.log("=");
    console.log("=   STARTING NEW BOT RUN ver " + version);
    if(!isProd){
        console.log('= DEVELOPMENT MODE');
    }
    console.log("=");
    console.log("=========================================");
    console.log(`App listening on port ${PORT}`);
    console.log("Press Ctrl+C to quit.");
});

