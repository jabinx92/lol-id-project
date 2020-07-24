import React from 'react'

const enterName = (props) => {
    return (
        <div>Enter League of Legends Name:
            <form onSubmit={props.handleSubmit}>
                <label>
                    <input type="text" name="name" placeholder="Input Here" onChange={props.onChange}/>
                </label>
                    <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default enterName;