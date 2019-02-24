
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const asyncHandler = require('./asyncHandler');

const PORT = process.env.PORT;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_ID = process.env.SECRET_CLIENT_ID;

const accessToken = 'https://github.com/login/oauth/access_token';
const user = 'https://api.github.com/user';

const app = express();
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/login/:clientId',
  asyncHandler(async (req, res) => {
    const clientId = req.params.clientId;
    const url = `${accessToken}?client_id=${CLIENT_ID}&client_secret=${CLIENT_ID}&code=${clientId}`;

    const data = await fetch(url)
      .then(response => response.text())
      .then(data => fetch(`${user}?${data}`))
      .then(response => response.json())
      .then(data => data.login);
    res.send(data);
  })
);

app.listen(PORT);
