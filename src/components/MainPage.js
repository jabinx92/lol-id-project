import React from 'react';

const MainPage = (props) => {
    return (
        <div>
        The input you submitted is: {props.username}
        {console.log(props)}
        </div>
    )
}

export default MainPage;