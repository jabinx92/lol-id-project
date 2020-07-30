import React, { Component } from 'react';
// import axios from 'axios';
import Heroes from './Heroes'

// const URL = "http://ddragon.leagueoflegends.com/cdn/10.15.1/data/en_US/champion.json";

class MainPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            loaded: false
        }
    }

    // componentDidMount() {
    //     const proxyurl = "https://cors-anywhere.herokuapp.com/";
    //     const url = "http://ddragon.leagueoflegends.com/cdn/10.15.1/data/en_US/champion.json"; // site that doesn’t send Access-Control-*
    //         fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
    //             .then(response => response.text())
    //             .then(contents => {
    //                 this.state.data.push(contents)
    //                 console.log(this.state.data)
    //             })
    //             .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))   
    // }

    componentDidMount() {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = "http://ddragon.leagueoflegends.com/cdn/10.15.1/data/en_US/champion.json"; // site that doesn’t send Access-Control-*
            fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
                .then(response => response.json())
                .then(contents => {
                    this.setState({ data: contents})
                    console.log(this.state.data.data)
                })
                .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))   

    }


    // componentDidMount() {
    //     axios.get(URL)
    //         .then(res => {
    //             this.setState({
    //                 data: res
    //             });
    //         });
    //     console.log(this.state.data)
    // }

    

    render() {
        let Loader = Object.keys(this.state.data.data).map((loader =>
            <Heroes id={loader.key} hero={loader.id}/>
        ))
        
        return (
            <div>
                {Loader}
            </div>
        )
    }
}

export default MainPage;

//start