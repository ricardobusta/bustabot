'use strict';

const express = require('express');

const botKey = require("./botkey.js").key;

const bot = require("./bot.js");

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res
    .status(200)
    .send('Hello, world!')
    .end();
});

app.get('/' + botKey, (req, res) => {
  res
    .status(200)
    .send("Bot Working!")
    .end();
});

app.post('/' + botKey, (req, res) => {
  //console.log(req.body)

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