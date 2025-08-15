import * as express from "express";
import * as FirebaseFirestore from "@google-cloud/firestore";
import * as botKey from "./bot_key"
import Bot from './bot_core/Bot/bot';
import RequestService from "./bot_core/Bot/request_service";
import TelegramService from "./bot_core/Bot/telegram_service";
import BustaBot from "./bustabot/bustabot";
import TelegramBot = require('node-telegram-bot-api');
import * as http from "node:http";
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";

function GetRevision(): string {
    try {
        if (existsSync(".git")) {
            return execSync("git rev-parse HEAD").toString().trim();
        }
    } catch (err) {
        // ignore if git not available
    }
    return "unknown";
}

const version_major: number = 3;
const version_minor: number = 0;
const version_patch: number = 0;
const version: string = `${version_major}.${version_minor}.${version_patch}`;
const revision: string = GetRevision()

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

const request: RequestService = new RequestService();
const telegram: TelegramService = new TelegramService(request);

const bustabot: BustaBot = new BustaBot(telegram, request, version);

const bots: Bot[] = [
    bustabot,
]

function GetFirestore(): FirebaseFirestore.Firestore {
    return new FirebaseFirestore.Firestore({
        projectId: botKey.projectId,
        keyFilename: "google_key.json",
    });
}

try {
    let db: FirebaseFirestore.Firestore = GetFirestore();

    if (isProd) {
        bustabot.Init(db, botKey.bustabot);
    } else {
        bustabot.Init(db, botKey.dev_bustabot);
    }
} catch (error) {
    console.log(error);
}

const app: any = express();

app.use(express.json());

// Default request. Just to check if the bot is up.
app.get("/", (req, res): void => {
    res
        .status(200)
        .send(version)
        .end();
});

bots.forEach((bot: Bot): void => {
    if (!bot.initialized) {
        return;
    }
    // Check if the proper key is set. Just make a request with the bot key appended.
    app.get(`/${bot.botKey}`, (req, res): void => {
        res
            .status(200)
            .send(`${bot.botName} is Working!`)
            .end();
    });

    // Actual bot requests.
    app.post(`/bot${bot.botKey}`, (req, res): void => {
        bot.HandleTelegramUpdate(req.body as TelegramBot.Update)
        res
            .status(200)
            .end();
    });
});

// Start the server
const PORT: string | number = process.env.PORT || 18080;

const server = http.createServer(app);
server.maxRequestsPerSocket = 0;
server.keepAliveTimeout = 5000;

server.listen(PORT, (): void => {
    console.log("================================================");
    console.log("=                                              =");
    console.log(`=   STARTING NEW BOT RUN ver ${version.padEnd(18, " ")}=`);
    console.log(`=   ${revision}   =`);
    if(!isProd){
        console.log('=   DEVELOPMENT MODE                           =');
    }
    console.log("=                                              =");
    console.log("================================================");
    console.log(`App listening on port ${PORT}`);
    console.log("Press Ctrl+C to quit.");
});