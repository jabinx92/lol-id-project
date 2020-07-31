import React from 'react';
import { Image, Media } from 'react-bootstrap';

const Heroes = (props) => (

    <Media>
        <Image className="mr-3" src={"http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + props.hero + "_0.jpg"} alt="" rounded/>
            <Media.Body>
                <h5>{props.title}</h5>
                <p>
                {props.blurb}<a href="/#" src={"https://na.leagueoflegends.com/en-us/champions/" + props.hero + "/"}>Read More</a>
                </p>
            </Media.Body>
    </Media>
    
)

export default Heroes