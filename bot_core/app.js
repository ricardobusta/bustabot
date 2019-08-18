const express = require('express');
const telegramBotKey = require("./bot_info").key;
const googleProjectId = require("./bot_info").projectId;
const bot = require("./bot_core/bot");
const app = express();
const Firestore = require('@google-cloud/firestore');

app.use(express.json());

app.get('/', (req, res) => {
    res
        .status(200)
        .send('Hello, world!')
        .end();
});

app.get('/' + telegramBotKey, (req, res) => {
    res
        .status(200)
        .send("Bot Working!")
        .end();
});

app.post('/' + telegramBotKey, (req, res) => {
    bot.handleRequest(req.body)

    res
        .status(200)
        .end();
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});

var db = new Firestore({
    projectId: googleProjectId,
    keyFilename: 'google_key.json',
});

bot.init(db);