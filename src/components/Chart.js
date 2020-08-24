import React, {Component} from 'react'
import {Bar, Line, Pie} from 'react-chartjs-2'

class Chart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chartData: {
                labels: ['Zed', 'Akali', 'Nunu', 'Luxe', 'Amumu', 'Fiona'],
                datasets:[
                    {
                        label:'Times Played',
                        data:[
                            8,
                            2,
                            4,
                            4,
                            1,
                            1
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
        }
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
export default Chart