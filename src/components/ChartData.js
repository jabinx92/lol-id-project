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
            stats: [],
            matchHistory: null,
            chartData: {}
        }
    }

    componentDidMount() {
        this.getMatchHistory();
        this.getChartData();
    }

    getMatchHistory () {
        const proxyurl = "https://mysterious-wave-96239.herokuapp.com/";
        const url = "https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/" + this.state.accountId + "?endIndex=20&api_key=" +process.env.REACT_APP_SECRET_KEY;
        fetch(proxyurl + url)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    matchHistory: result
                }
                ,console.log(result)
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
        this.setState({
          chartData:{
            labels: ['Zed', 'Akali', 'Nunu', 'Luxe', 'Amumu', 'Fiona', 'Yassuo'],
            datasets:[
              {
                label:'Population',
                data:[
                    8,
                    2,
                    4,
                    4,
                    1,
                    1,
                    3
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