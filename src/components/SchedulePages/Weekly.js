import React from "react";
import DaysOfWeek from './ScheduleModules/DaysOfWeek'
import AtTime from "./ScheduleModules/AtTime";

const Weekly = () => {

    return (
        <div className="weekly-block content-block">
            <DaysOfWeek needRadio={false} />
            <AtTime needRadio={false}/>
        </div>
    )
}

export default Weekly