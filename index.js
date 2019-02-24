
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const asyncHandler = require('./asyncHandler');

const PORT = process.env.PORT;
const CLIENT_ID = process.env.CLIENT_ID;
const SECRET_CLIENT_ID = process.env.SECRET_CLIENT_ID;
console.log(PORT);
console.log(CLIENT_ID);
console.log(SECRET_CLIENT_ID);

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
    const url = `${accessToken}?client_id=${CLIENT_ID}&client_secret=${SECRET_CLIENT_ID}&code=${clientId}`;
    console.log(url);
    const data = await fetch(url)
      .then(response => {
        console.log(response);
        return response.text()
      })
      .then(data => fetch(`${user}?${data}`))
      .then(response => {
        console.log(response);
        return response.json()
      })
      .then(data => data.login);
    console.log(data);
    res.send(data);
  })
);

app.listen(PORT);
