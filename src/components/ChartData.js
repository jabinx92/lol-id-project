import React, { Component } from 'react'

class ChartData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            accountId: props.accountId,
            newData: null,
            championList: []
        }
    }


    

    componentDidMount () {
      let championList = [];
      const proxyurl = "https://mysterious-wave-96239.herokuapp.com/";
      fetch(proxyurl + `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${this.state.accountId}?endIndex=20&api_key=${process.env.REACT_APP_SECRET_KEY}`)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              newData:  Object.entries(result.matches).map(([x,championId]) => {
              return championList.push(championId.champion)
              })
            })
          }
        )
        console.log(championList)
    }
    

    render() {  
        return (
        <div>hello</div>
        )
    }
}

export default ChartData