import React, { Component } from 'react';
// import axios from 'axios';
import Heroes from './Heroes'

// const URL = "http://ddragon.leagueoflegends.com/cdn/10.15.1/data/en_US/champion.json";

class MainPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            loaded: false
        }
    }

    componentDidMount() {
        
        const url = "http://ddragon.leagueoflegends.com/cdn/10.15.1/data/en_US/champion.json";
            fetch(url) 
                .then(response => response.json())
                .then(contents => {
                    this.setState({ data: contents})
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
        if(this.state.data === null) {
            return (<div className="wrap">
            <div className="loading">
              <div className="bounceball"></div>
              <div className="text">NOW LOADING</div>
            </div>
          </div>)
        }
        let Loader = Object.entries(this.state.data.data).map(([name,loader]) =>
            <Heroes key={loader.key} hero={loader.id} title={loader.title} blurb={loader.blurb}/>
        )
        
        return (
            <div>
                {Loader}
            </div>
        )
    }
}

export default MainPage;

//start