import React, { Component } from 'react';
import EnterName from './components/EnterName';
import MainPage from './components/MainPage';
import FindSummoner from './components/FindSummoner';
import Chart from './components/Chart'
import TopChampMaps from './components/TopChampMaps'


class App extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      username: '',
      redirectToReferrer: false,
      repoData: [{
        id: 23123123,
        name: "Advanced-React",
        html_url: "https://github.com/bchiang7/Advanced-React",
        description: "Starter Files and Solutions for Full Stack Advanced React and GraphQL ",
        language: "JavaScript",
        stargazers_count: 3,
        forks: 3,
        size: 5132
      }]
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ redirectToReferrer: true});
  }

    handleChange = (event) => {
    this.setState({username: event.target.value});
  }
  
  render() {
    return (
      <div>
        {this.state.redirectToReferrer === false ?
          (<EnterName className="EnterName" handleSubmit={this.handleSubmit} onChange={this.handleChange}/>) : (
          <div>
            <FindSummoner username={this.state.username}/>
            <Chart username={this.state.username} legendPosition="bottom" displayTitle="true" />

            <TopChampMaps repoData={this.state.repoData} />

            <MainPage username={this.state.username}/>
          </div>
        )}
      </div>
    );
  }
}

export default App;

//start
