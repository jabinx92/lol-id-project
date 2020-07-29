import React, { Component } from 'react';
// import axios from 'axios';

class MainPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            info: []
        }
    }


    componentDidMount() {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = "https://na1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=RGAPI-d7e57a1c-a9de-4cac-95ae-c473e1df6bd1"; // site that doesn’t send Access-Control-*
            fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
                .then(response => response.text())
                .then(contents => {
                    this.state.info.push(contents)
                    console.log(contents)})
                .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
                
    }

    render() {
        return (
            <div>
                The input you submitted is: {this.props.username}
                <ul>
                {this.state.info.map(thing => <li>{thing.username}</li>)}
                </ul>
            </div>
        )
    }
}

export default MainPage;

//start