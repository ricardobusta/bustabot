'use strict';

const express = require('express');

const path = require('path');
const bot_key = require(path.resolve( __dirname, "./botkey.js" )).key;

const bot_url = 'https://api.telegram.org/'+bot_key+'/';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res
    .status(200)
    .send('Hello, world!')
    .end();
});

app.get('/'+bot_key, (req, res) => {
  console.log(req.query)

  res
    .status(200)
    .send("Bot Working!")
    .end();
});

app.post('/'+bot_key, (req, res) => {
  console.log(req.body)

  res
    .status(200)
    .send("Bot Working!")
    .end();
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
  console.log('bot path '+ '/'+bot_key)
});