import React from "react";

const Button = ({ name, isActive, onClick }) => {
    return (
        <div className="btn-div">
            <button
                onClick={onClick}
                className={"btn" + (isActive ? "" : " is-disabled")}
            >
                {name}
            </button>
        </div>
    );
};

export default Button;
