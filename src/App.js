import React, { Component } from 'react';
import { Layout } from './components/Layout';
import EnterName from './components/EnterName';
import MainPage from './components/MainPage';



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
    this.setState({username: event.target.value, redirectToReferrer: true});
  }

  handleChange = (event) => {
    this.setState({username: event.target.value});
  }
  
  render() {
    return (
      <React.Fragment>
        <Layout>
          {this.state.redirectToReferrer === false ?
              <EnterName handleSubmit={this.handleSubmit} onChange={this.handleChange}/> : <MainPage username={this.state.username}/>}
        </Layout>
    </React.Fragment>
    );
  }
}

export default App;
