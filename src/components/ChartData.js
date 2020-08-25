import React, {Component} from 'react'
import {Bar
    // ,Line
    // ,Pie
} from 'react-chartjs-2'

class ChartData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            accountId: props.accountId,
            matchHistory: null,
            chartData: {},
            championLibrary: null
        }
    }

    componentDidMount() {
        this.getMatchHistory();
        this.getChartData();
    }

    getHeroJson () {
      let championObj = {}
      const proxyurl = "https://mysterious-wave-96239.herokuapp.com/";
        const url = "https://ddragon.leagueoflegends.com/cdn/10.15.1/data/en_US/champion.json";
          fetch(proxyurl + url) 
            .then(response => response.json())
            .then(contents => {
                console.log(contents.data);
                this.setState({ 
                  championLibrary: Object.entries(contents.data).map(([key, value]) => {
                  return  championObj[value.key] = [value.id].toString()
                  }, console.log(championObj))
                })
            })
            .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))

            
            this.matchHeroes(championObj)
    }

    matchHeroes (heroList) {
      console.log(heroList)
    }

    getMatchHistory () {
        let championList = [];
        const proxyurl = "https://mysterious-wave-96239.herokuapp.com/";
        const url = "https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/" + this.state.accountId + "?endIndex=20&api_key=" +process.env.REACT_APP_SECRET_KEY;
        fetch(proxyurl + url)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    matchHistory: Object.entries(result.matches).map(([x,championId]) => {
                      return championList.push(championId.champion)
                    })
                }
                ,console.log(championList),
                this.getHeroJson()
                );
            },
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


    getChartData(){
        let championCount = {
          'Zed': 8,
          'Akali': 2,
          'Nunu' : 4,
          'Luxe' : 4,
          'Amumu': 1,
          'Fiona': 1,
          'Yassuo': 3
        }

        this.setState({
          chartData:{
            labels: Object.keys(championCount),
            datasets:[
              {
                label:'Population',
                data: Object.values(championCount),
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

    static defaultProps = {
        displayTitle: true,
        displayLegends: true,
        legendPosition: 'right'
    }
    
    render () {
        return (
            <div className="chart">
                <Bar
                    data={this.state.chartData}
                    options={{
                        scales: {
                            yAxes: [{
                              ticks: {
                                beginAtZero: true
                              }
                            }]
                          },
                        title: {
                        display: this.props.displayTitle,
                        text: "Most played champions in 20 games",
                        fontSize: 25
                    },
                    legend: {
                    display: this.props.displayLegend,
                    position: this.props.legendPosition
                    }
                }}
                />
            </div>
        )
    }
}
export default ChartData