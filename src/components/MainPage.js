import React, { Component } from 'react';
// import axios from 'axios';
import Heroes from './Heroes'
import Chart from './Chart';


class MainPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            loaded: false,
            chartData: props.chartData
        }
    }



    componentDidMount() {
        this.getChartData();
        const url = "https://ddragon.leagueoflegends.com/cdn/10.15.1/data/en_US/champion.json";
            fetch(url) 
                .then(response => response.json())
                .then(contents => {
                    this.setState({ data: contents})
                })
                .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))   
    }

    getChartData(){
        // Ajax calls here
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
              <Chart chartData={this.state.chartData} amount="20 Games" legendPosition="bottom"/>
              {Loader}
          </div>
      )
    }
}

export default MainPage;

//start