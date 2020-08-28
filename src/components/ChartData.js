import React, {Component} from 'react';
import {Bar,Line,Pie} from 'react-chartjs-2';
import ChartStyles from './styles/ChartsStyles';
import  Section  from '../style/Section';



class ChartData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            accountId: props.accountId,
            matchHistory: [],
            chartData: {},
            championLibrary: {},
            championList:[]
        }
    }

    componentDidMount = () => {
        this.getMatchHistory();
    }

    getMatchHistory = () => {
        let championList = [];
        const proxyurl = "https://mysterious-wave-96239.herokuapp.com/";
        const url = "https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/" + this.state.accountId + "?endIndex=20&api_key=" +process.env.REACT_APP_SECRET_KEY;
        fetch(proxyurl + url)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    matchHistory: Object.entries(result.matches).map(([x,championId]) => 
                       championList.push(championId.champion.toString())
                    )
                }
                )
                this.getHeroJson(championList)
                this.setState({
                  championList: championList
                })
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

    getHeroJson = (championList) => {
      let championObj = {}
      const proxyurl = "https://mysterious-wave-96239.herokuapp.com/";
        const url = "https://ddragon.leagueoflegends.com/cdn/10.15.1/data/en_US/champion.json";
          fetch(proxyurl + url) 
            .then(response => response.json())
            .then(contents => {
                  Object.entries(contents.data).map(([key, value]) => 
                    championObj[value.key] = [value.name].toString()
                  )
                  this.matchHeroes(championObj, championList)
            })
            .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
    }

    matchHeroes = (championObj, championList) => {
      let obj = {}
      //loop over championList array to compare with championObj object
      for (var i = 0; i < championList.length; i++) {
      //if the index is not in the object, add it into empty object and make the value 1
      if (obj[championObj[championList[i]]] === undefined) {
        obj[championObj[championList[i]]] = 1
        //else if the index is already found in the object, increment the value by + 1 
      } else if (obj[championObj[championList[i]]] !== undefined) {
        obj[championObj[championList[i]]] += 1
      }
    }
    //return the object
    return this.getChartData(obj)
    }


    getChartData = (obj) => {
        this.setState({
          chartData:{
            labels: Object.keys(obj),
            datasets:[
              {
                label:'Population',
                data: Object.values(obj),
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
        const chartSize = 200
        return (
          <Section>
            <ChartStyles>
              <div className="chart">
              <header>
              <h2>Top 3 Champs (20 Games)</h2>
              </header>
              <div className="chart-container">
              <canvas id="langChart" width={chartSize} height={chartSize} />
                <Bar
                    data={this.state.chartData}
                    options={{
                      scales: {
                        yAxes: [{
                          ticks: {
                            beginAtZero: true,
                            callback: function (value) { if (Number.isInteger(value)) { return value; } }
                          }
                        }]
                      },
                      title: {
                        display: this.props.displayTitle,
                        fontSize: 25
                      },
                      legend: {
                        display: this.props.displayLegend,
                        position: this.props.legendPosition
                      }
                    }}
                    />
              </div>
              </div>

              <div className="chart">
              <header>
              <h2>Top 3 Champs (20 Games)</h2>
              </header>
              <div className="chart-container">
              <canvas id="langChart" width={chartSize} height={chartSize} />
                <Line
                    data={this.state.chartData}
                    options={{
                      scales: {
                        yAxes: [{
                          ticks: {
                            beginAtZero: true,
                            callback: function (value) { if (Number.isInteger(value)) { return value; } }
                          }
                        }]
                      },
                      title: {
                        display: this.props.displayTitle,
                        fontSize: 25
                      },
                      legend: {
                        display: this.props.displayLegend,
                        position: this.props.legendPosition
                      }
                    }}
                    />
              </div>
              </div>

              <div className="chart">
              <header>
              <h2>Top 3 Champs (20 Games)</h2>
              </header>
              <div className="chart-container">
              <canvas id="langChart" width={chartSize} height={chartSize} />
                <Pie
                    data={this.state.chartData}
                    options={{
                      scales: {
                      },
                      title: {
                        display: this.props.displayTitle
                      },
                      legend: {
                        display: this.props.displayLegend,
                        position: this.props.legendPosition
                      }
                    }}
                    />
              </div>
              </div>
            </ChartStyles>
          </Section>
        )
    }
}
export default ChartData