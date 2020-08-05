import React, { Component } from 'react';
import { Image, Media } from 'react-bootstrap';
import  BRONZE  from '../assets/ranked-emblems/Emblem_Bronze.png'
import  CHALLENGER  from '../assets/ranked-emblems/Emblem_Challenger.png'
import  DIAMOND  from '../assets/ranked-emblems/Emblem_Diamond.png'
import  GOLD  from '../assets/ranked-emblems/Emblem_Gold.png'
import  GRANDMASTER  from '../assets/ranked-emblems/Emblem_Grandmaster.png'
import  IRON  from '../assets/ranked-emblems/Emblem_Iron.png'
import  MASTER  from '../assets/ranked-emblems/Emblem_Master.png'
import  PLATINUM  from '../assets/ranked-emblems/Emblem_Platinum.png'
import  SILVER  from '../assets/ranked-emblems/Emblem_Silver.png'



class SummonerRank extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        id: props.id,
        stats: []
      };
    }
    
  
    componentDidMount() {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + this.state.id + "?api_key=RGAPI-fae71a86-710a-4f8f-a3e6-08b889282e66"; // site that doesn’t send Access-Control-*
        fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              stats: result
            });
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
    const { error, isLoaded, stats } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else if(isLoaded) {
      return (
        <Media>
        {stats.length ?  (
          <div>
              <Image  src={rankedImage} alt={stats[0].tier} rounded/>
              <Media.Body>
              Tier : {stats[0].tier} 
              Rank : {stats[0].rank}
              </Media.Body>
              </div>
          ) : (
            <div>
              User has not played any ranked games recently!
            </div>
          )}
          </Media>
      );
    }
  }
}
export default SummonerRank;