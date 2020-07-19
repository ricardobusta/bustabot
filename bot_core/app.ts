import Bot from "./Bot/bot";

import express = require("express");
const botGetInfo = require("../bot_info").getInfo;
const googleProjectId = require("../bot_info").projectId;
import FirebaseFirestore = require("@google-cloud/firestore");


const bots: Array<Bot> = [
    require("../bustabot/bustabot"),
    require("../jukebot/jukebot"),
];

// Firestore integration
try {
    let db = new FirebaseFirestore.Firestore({
        projectId: googleProjectId,
        keyFilename: "google_key.json",
    });

    // Initializes the bot with database
    bots.forEach(bot => {
        bot.init(db, botGetInfo(false))
    });
} catch (error) {
    console.log(error);
}

let isProd: boolean = false;

process.argv.forEach(function name(val, index, arr) {
    if (val === 'prod') {
        isProd = true;
    }
})

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
                .send(bot.botName + " is Working!")
                .end();
        });

        // Actual bot requests.
        app.post("/" + bot.botName, (req, res) => {
            bot.handleTelegramMessage(req.body)
            res
                .status(200)
                .end();
        });
    });

    // Start the server
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log("App listening on port ${PORT}");
        console.log("Press Ctrl+C to quit.");
    });
}