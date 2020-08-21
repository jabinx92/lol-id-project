import React, { Component } from 'react'
import ChartDataAgain from './ChartDataAgain'

class ChartData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: props.username,
            accountId: null,
            newData: null,
            championList: [],
            championLibrary: null,
            chartData: {},
            data: null,
            loaded: false
        }
    }
    getHeroes = (list) => {
      console.log(list)
    }

    mounter = () => {
        const proxyurl = "https://mysterious-wave-96239.herokuapp.com/";
        const url = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + this.state.username + "?api_key=" + process.env.REACT_APP_SECRET_KEY; // site that doesn’t send Access-Control-*
           fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/
            .then(res => res.json())
            .then(
              (result) => {
                this.setState({
                  accountId: result.accountId,
                });
              },
              // Note: it's important to handle errors here
              // instead of a catch() block so that we don't swallow
              // exceptions from actual bugs in components.
              (error) => {
                this.setState({
                  isLoaded: true,
                  error: {
                    message: "Error - Something went wrong!"
                  }
                });
              }
            )
    }


      // componentDidMount = () => {

      //   const proxyurl = "https://mysterious-wave-96239.herokuapp.com/";
      //   const url = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + this.state.username + "?api_key=" + process.env.REACT_APP_SECRET_KEY; // site that doesn’t send Access-Control-*
      //      fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/
      //       .then(res => res.json())
      //       .then(
      //         (result) => {
      //           this.setState({
      //             accountId: result.accountId
      //           });
      //         },
      //         // Note: it's important to handle errors here
      //         // instead of a catch() block so that we don't swallow
      //         // exceptions from actual bugs in components.
      //         (error) => {
      //           this.setState({
      //             isLoaded: true,
      //             error: {
      //               message: "Error - Something went wrong!"
      //             }
      //           });
      //         }
      //       )

      // }

    

    render() {
        return (
          <div>
            <ChartDataAgain accountId={this.state.accountId}/>
          </div>
        )
    }
}

export default ChartData