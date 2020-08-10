import React, { Component } from 'react';
import SummonerRank from './SummonerRank'
import { Image, Media } from 'react-bootstrap';
import UserInfoStyles from './styles/UserInfoStyles'
import Section from '../style/Section';


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
    // const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + this.state.username + "?api_key=" +process.env.REACT_APP_SECRET_KEY; // site that doesn’t send Access-Control-*
        fetch(url) // https://cors-anywhere.herokuapp.com/https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              allInfo: result
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
    const { error, isLoaded, allInfo } = this.state;
    if (error) {
      return <div>{error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else if(isLoaded) {
      return (
        <Section dark>

        <Media>
        {allInfo.name ?  (
          <UserInfoStyles>
            <div>
              <Image className="avatar" src={"http://ddragon.leagueoflegends.com/cdn/10.15.1/img/profileicon/" + allInfo.profileIconId + ".png"} alt="" rounded/>
              
              <Media.Body>
              Username : {allInfo.name},  
              Summoner Level : {allInfo.summonerLevel}, 
              <SummonerRank id={allInfo.id}/>
              </Media.Body>
            </div>
          </UserInfoStyles>
          ) : (
            <div>
              Error - Username not found!
            </div>
          )}
          </Media>
          </Section>
      );
    }
  }
}
export default FindSummoner;