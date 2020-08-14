import React, { Component } from 'react';
const {DDragon, Pyke} = require('pyke');

class Picket extends Component {
    constructor(props){
        super(props)

        const pyke = new Pyke(`RGAPI-0cad40a1-aa55-4a0f-93dc-eb0653d392ea`, "10"); // 10 seconds to cache
        pyke.summoner.getBySummonerName("huhi", "na1").then(data => {
        console.log(`Summoner Name is : ${data.name}, and level is : ${data.summonerLevel}`);
        }).catch(console.error);
    }

    render () {
        return (
            <div>
            hello
            </div>
        )
    }
}


export default Picket