import React from 'react'
import '../../src/App.scss';
import lolpng from '../assets/lolpng.png'

//https://chakra-ui.com/button recommended for nice styling

const EnterName = (props) => {
    
    return (
            <div className="sizing">
                <header>
                    <img src={lolpng} alt=''/>
                </header>
                <div>Enter League of Legends Name:
                    <form onSubmit={props.handleSubmit}>
                        <label>
                            <input type="text" name="name" placeholder="Input Here" onChange={props.onChange}/>
                        </label>
                            <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
    )
}

export default EnterName;

//start