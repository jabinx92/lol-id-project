import React, { Component } from 'react';
import { Image, Media } from 'react-bootstrap';


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
    const url = "https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + this.state.username + "?api_key=RGAPI-f74db59c-7381-4099-b5f9-b307f314aa6a"; // site that doesn’t send Access-Control-*
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
              error: {
                message: "Error - Something went wrong!"
              }
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
      } else if(isLoaded) {
        return (
          <Media>
                  {name ?  (
                    <div>
                        <Image  src={"http://ddragon.leagueoflegends.com/cdn/10.15.1/img/profileicon/" + profileIconId + ".png"} alt="" rounded/>
                      <Media.Body>
                      Username:{name}
                      Summoner Level: {summonerLevel}
                      </Media.Body>
                      
                    </div>
                  ) : (
                    <div> Error - Username not found! </div>
                    )}
                    </Media>
        
        );
    }
  }
}
export default FindSummoner;