const express = require("express");
const telegramBotKey = require("./bot_info").key;
const googleProjectId = require("./bot_info").projectId;
const bot = require("./bustabot");
const app = express();
const Firestore = require("@google-cloud/firestore");

// Firestore integration
try {
    let db = new Firestore({
        projectId: googleProjectId,
        keyFilename: "google_key.json",
    });

    // Initializes the bot with database
    bot.init(db);
} catch (error) {

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
app.get("/" + telegramBotKey, (req, res) => {
    res
        .status(200)
        .send("Bot Working!")
        .end();
});

// Actual bot requests.
app.post("/" + telegramBotKey, (req, res) => {
    bot.handleRequest(req.body)

    res
        .status(200)
        .end();
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("App listening on port ${PORT}");
    console.log("Press Ctrl+C to quit.");
});