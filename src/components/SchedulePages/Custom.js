import React from "react";
import EachMinutes from "./ScheduleModules/EachMinutes";
import AtTime from "./ScheduleModules/AtTime";
import DaysOfMonth from "./ScheduleModules/DaysOfMonth";
import DaysOfWeek from "./ScheduleModules/DaysOfWeek";
import Months from "./ScheduleModules/Months";

const Custom = () => {
    return (
        <div className="custom-block content-block">
            <Months needRadio={false} />
            <DaysOfMonth needRadio={true} />
            <DaysOfWeek needRadio={false} />
            <EachMinutes needRadio={true} />
            <AtTime needRadio={true} />
        </div>
    );
};

export default Custom;
