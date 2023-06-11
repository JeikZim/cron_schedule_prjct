import React from "react";

const Button = (props) => {
    return (
        <div className="btn-div">
            <button onClick={props.onClick} className="btn">{props.name}</button>
        </div>
    )
}

export default Button