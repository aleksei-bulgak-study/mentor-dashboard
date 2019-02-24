
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const asyncHandler = require('./asyncHandler');

// const PORT = process.env.PORT;
const PORT = 8080;
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
    const uuid1 = 'bcf0a6cf1918c0481c37';
    const uuid2 = '660e41c020e85e8ed47084c12bd874e47ed656dd';
    const accessToken= 'https://github.com/login/oauth/access_token';
    const clientId = req.params.clientId;
    const user= 'https://api.github.com/user';
    const url = `${accessToken}?client_id=${uuid1}&client_secret=${uuid2}&code=${clientId}`;

    const data = await fetch(url)
      .then(response => response.text())
      .then(data => fetch(`${user}?${data}`))
      .then(response => response.json())
      .then(data => {
        console.log(data)
        return data.login
      });
    res.send(data);
  })
);

app.listen(PORT);
