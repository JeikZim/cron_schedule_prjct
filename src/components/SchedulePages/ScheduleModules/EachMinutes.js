import React, { useState } from "react";

const EachMinutes = () => {
    const [minutes, setMinutes] = useState("");
    
    const eachMinHandler = (ev) => {
        let val = ev.target.value.replace(/[^0-9]/, '')

        if (val > 60) {
            val = 60
        }
        if (val.length > 2) {
            val = val.slice(1, 3)
        }

        setMinutes(val)
    }

    return (
        <div className="each-min">
            <label htmlFor="each-min-input">
                Each <input id="each-min-input" type="text" value={minutes} onChange={eachMinHandler}/> minutes
            </label>
        </div>
    )
}

export default EachMinutes;