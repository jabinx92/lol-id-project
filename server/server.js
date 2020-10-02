const express = require('express');
const app = express();
const fetch = require('node-fetch');

//fetch info when you type a username or fetch chartdata
app.get(`/api/:username`, (req, res) => {

    console.log(`req.params + ` +req.params.username)

    fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.params.username}?api_key=RGAPI-031ffc06-01a2-4696-9e40-235d76f08cc1`)
    .then(res => res.json())
    .then(result => res.json(result));
});

//fetches the usernames accountid to get further information
app.get(`/api/getHero/:accountId`, (req, res) => {

    console.log(`req.params + ` + req.params.accountId)

    fetch(`https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${req.params.accountId}?endIndex=20&api_key=RGAPI-031ffc06-01a2-4696-9e40-235d76f08cc1`)
    .then(res => res.json())
    .then(result => res.json(result));
});

//fetch summoner rank
app.get(`/api/summonerRank/:id`, (req, res) => {

    console.log(`req.params + ` + req.params.id)

    fetch(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${req.params.id}?api_key=RGAPI-031ffc06-01a2-4696-9e40-235d76f08cc1`)
    .then(res => res.json())
    .then(result => res.json(result));
});


const port = 5000;

app.listen(port, '0.0.0.0')