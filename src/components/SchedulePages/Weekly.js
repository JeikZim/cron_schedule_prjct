import React from "react";
import DaysOfWeek from './ScheduleModules/DaysOfWeek'
import AtTime from "./ScheduleModules/AtTime";
import EachMinutes from "./ScheduleModules/EachMinutes"

const Weekly = () => {

    return (
        <div className="weekly-block content-block">
            <DaysOfWeek needRadio={false} />
            <EachMinutes needRadio={true} />
            <AtTime needRadio={true} />
        </div>
    )
}

export default Weekly