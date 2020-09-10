const express = require('express');
const app = express()
const port = 5000;

app.get('/', (req, res) => res.send("Hello World!"));
app.get("/newEndpoint", (req, res) => res.send("This is my new endpoint!"));

app.get("/UserInfo", (req, res) => {
    request('https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/huhi?api_key=RGAPI-031ffc06-01a2-4696-9e40-235d76f08cc1', function (error, response, body) {
        if(!error){
            res.send(body)
            console.log(response);
            console.log(body);
        }
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

//test