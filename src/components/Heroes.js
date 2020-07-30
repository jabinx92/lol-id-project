import React from 'react'

const Heroes = (props) => (
    <div>
        <img src={"http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + props.hero + "_0.jpg"} alt=""/>
    </div>
)

export default Heroes