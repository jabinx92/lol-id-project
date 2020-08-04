import React, { Component } from 'react';


class FindSummoner extends Component {
    constructor(props) {
      super(props);
      this.state = {
        username : props.username,
        error: null,
        isLoaded: false,
        id: null,
        accountId: null,
        puuid: null,
        name: null,
        profileIconId: null,
        summonerLevel: null,
        test: null
      };
    }
    
  
    componentDidMount() {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + this.state.username + "?api_key=RGAPI-37284532-c5e5-4249-a3dc-af8022a7678f"; // site that doesn’t send Access-Control-*
        fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              id: result.id,
              accountId: result.accountId,
              puuid: result.puuid,
              name: result.name,
              profileIconId: result.profileIconId,
              summonerLevel: result.summonerLevel,
              allInfo: result
            });
            console.log(this.state.test)
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
  
    render() {
      const { error, isLoaded, id, accountId, puuid, name, profileIconId, summonerLevel } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
          <div>
            {id}
            {accountId}
            {puuid}
            {name}
            {profileIconId}
            {summonerLevel}
            {id}
          </div>
        );
      }
    }
  }

export default FindSummoner;