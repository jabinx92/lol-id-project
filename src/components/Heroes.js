import React from 'react';
import Image from 'react-bootstrap/Image'

const Heroes = (props) => (
    <div>
        <Image src={"http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + props.hero + "_0.jpg"} alt="" thumbnail />
    </div>

    
)

export default Heroes