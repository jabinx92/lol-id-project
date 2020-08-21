import React, { Component } from 'react';
import EnterName from './components/EnterName';
import MainPage from './components/MainPage';
import FindSummoner from './components/FindSummoner';
import ChartData from './components/ChartData'


class App extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      username: '',
      redirectToReferrer: false
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
            <ChartData username={this.state.username}/>
            <MainPage username={this.state.username}/>
          </div>
        )}
      </div>
    );
  }
}

export default App;

//start
