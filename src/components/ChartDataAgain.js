import React, {Component} from 'react';
import Chart from './Chart'

class ChartDataAgain extends Component {

    constructor(props) {
        super(props)
        this.state = {
            chartData: {},
            accountId: props.accountId,
            newData: {},
            championLibrary: null
        }

    }

    componentDidMount = () => {

      const proxyurl = "https://mysterious-wave-96239.herokuapp.com/";

      let championList = [];

      
      // const proxyurl = "https://mysterious-wave-96239.herokuapp.com/";
      fetch(proxyurl + `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${this.state.accountId}?endIndex=20&api_key=${process.env.REACT_APP_SECRET_KEY}`)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              newData:  Object.entries(result.matches).map(([x,championId]) => {
              return championList.push(championId.champion)
              })
            },(error) => {
              this.setState({
                isLoaded: true,
                error: {
                  message: "Error - Something went wrong!"
                }
              });
            })
          }
        )
        this.getHeroes(championList)

        this.getChartData();
    }

    getChartData = () => {
        const proxyurl = "https://mysterious-wave-96239.herokuapp.com/";
        const url = "https://ddragon.leagueoflegends.com/cdn/10.15.1/data/en_US/champion.json";
          fetch(proxyurl + url) 
            .then(response => response.json())
            .then(contents => {
                console.log(contents.data);
                this.setState({ 
                  championLibrary: contents.data
                })
            })
            .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
  
  
        this.setState({
          chartData:{
            labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
            datasets:[
              {
                label:'Population',
                data:[
                  1,
                  4,
                  15,
                  2,
                  5,
                  6
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

      getHeroes = (list) => {
        console.log(list)
      }

    render () {
        return (
            <div>
                <Chart chartData={this.state.chartData} amount="20 Games" legendPosition="bottom"/>
            </div>
        )
    }
}


export default ChartDataAgain