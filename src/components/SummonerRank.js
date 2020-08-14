import React, { Component } from 'react';
import { Image, Media } from 'react-bootstrap';
import Picket from './Pyke'

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
    const proxyurl = "https://mysterious-wave-96239.herokuapp.com/";

    const url = "https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + this.state.id + "?api_key=" +process.env.REACT_APP_SECRET_KEY;
    // site that doesn’t send Access-Control-*
        fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              stats: result
            }
            );
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
            <Image width="250" src={"ranked-emblems/"+stats[0].tier+".png"} alt={stats[0].tier} rounded fluid/>

            <div className="stats">
            <div className="stats__item">
              <span className="num">{stats[0].tier}</span>
              <span className="num-label">Rank</span>
            </div>
            <div className="stats__item">
              <span className="num">{stats[0].wins}</span>
              <span className="num-label">Wins</span>
            </div>
            <div className="stats__item">
              <span className="num">{stats[0].losses}</span>
              <span className="num-label">Losses</span>
            </div>
            </div>
            <Picket/>
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