const express = require("express");
const telegramBotKey_bustabot = require("../bot_info").bustabot.key;
const telegramBotKey_jukebot = require("../bot_info").jukebot.key;
const googleProjectId = require("../bot_info").projectId;
import bustabot from "../bustabot/bustabot";
import jukebot from "../jukebot/jukebot";
const app = express();
const Firestore = require("@google-cloud/firestore");

// Firestore integration
try {
    console.log(`Will init project with ${googleProjectId}`);
    let db = new Firestore({
        projectId: googleProjectId,
        keyFilename: "google_key.json",
    });

    // Initializes the bot with database
    bustabot.init(db);
    jukebot.init(db);
} catch (error) {
    console.log("Error on Firestore Initialization: " + error);
}

app.use(express.json());

// Default request. Just to check if the bot is up.
app.get("/", (req, res) => {
    res
        .status(200)
        .send("Hello, world!")
        .end();
});

// Check if the proper key is set. Just make a request with the bot key appended.
app.get("/" + telegramBotKey_bustabot, (req, res) => {
    res
        .status(200)
        .send("Busta Bot Working!")
        .end();
});

// // Check if the proper key is set. Just make a request with the bot key appended.
// app.get("/" + telegramBotKey_jukebot, (req, res) => {
//     res
//         .status(200)
//         .send("Juke Bot Working!")
//         .end();
// });

// Actual bot requests.
app.post("/" + telegramBotKey_bustabot, (req, res) => {
    bustabot.handleTelegramMessage(req.body)
    res
        .status(200)
        .end();
});

// // Actual bot requests.
// app.post("/" + telegramBotKey_jukebot, (req, res) => {
//     jukebot.handleTelegramMessage(req.body)
//     res
//         .status(200)
//         .end();
// });

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("App listening on port ${PORT}");
    console.log("Press Ctrl+C to quit.");
});