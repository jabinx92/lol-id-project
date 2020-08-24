import React, {Component} from 'react'
import ChartData from './ChartData'

class Chart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            stats: [],
            matchHistory: null,
            chartData: {},
            accountId: ''
        }
    }

    

    componentDidMount = () => {
        const proxyurl = "https://mysterious-wave-96239.herokuapp.com/";
        const url = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + this.props.username + "?api_key=" +process.env.REACT_APP_SECRET_KEY;
        fetch(proxyurl + url)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    stats: result,
                    accountId: result.accountId
                }
                ,console.log(`this is the users account id = ` + result.accountId));
            },
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

    

    
    render () {
    const { error, isLoaded } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else if(isLoaded) {
        return (
            <div className="chart">
            <ChartData accountId={this.state.accountId} />
            </div>
        )
        }
    }
}
export default Chart