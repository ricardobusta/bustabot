'use strict';

const express = require('express');

const path = require('path');
const botKey = require(path.resolve(__dirname, "./botkey.js")).key;

const bot = require(path.resolve(__dirname, "./bot.js")); 

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
  console.log(req.body)

  result = bot.handleRequest(req.body);

  res
    .status(200)
    .send(result)
    .end();
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  bot.init(botKey);

  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});