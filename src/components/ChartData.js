import React, { Component } from 'react'
import Chart from './Chart'

class ChartData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            accountId: props.accountId,
            newData: null,
            championList: [],
            championLibrary: null
        }
    }
    getHeroes = (list) => {
      console.log(list)
    }

    componentDidMount () {
      this.getChartData();
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


        this.getHeroes(championList)

    }

    getChartData(){
      // Ajax calls here
      const url = "https://ddragon.leagueoflegends.com/cdn/10.15.1/data/en_US/champion.json";
        fetch(url) 
          .then(response => response.json())
          .then(contents => {
              this.setState({ championLibrary: contents})
          })
          .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))

      this.setState({
        chartData:{
          labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
          datasets:[
            {
              label:'Population',
              data:[
                617594,
                181045,
                153060,
                106519,
                105162,
                95072
              ],
              backgroundColor:[
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 99, 132, 0.6)'
              ]
            }
          ]
        }
      });
    }

    render() {  
        return (
        <Chart chartData={this.state.chartData} amount="20 Games" legendPosition="bottom"/>
        )
    }
}

export default ChartData