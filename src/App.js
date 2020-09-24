import React, { Component } from 'react';
import EnterName from './components/EnterName';
import Footer from './components/Footer';
import FindSummoner from './components/FindSummoner';
import Chart from './components/Chart'
import TopChampMaps from './components/TopChampMaps'


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
            <Chart username={this.state.username} legendPosition="bottom" displayTitle="true" />
            
            <Footer />
          </div>
        )}
      </div>
    );
  }
}

export default App;

//start test commit
