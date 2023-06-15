import React from "react";
import EachMinutes from "./ScheduleModules/EachMinutes";
import AtTime from "./ScheduleModules/AtTime";
import Months from "./ScheduleModules/Months";
import DaysOfMonth from "./ScheduleModules/DaysOfMonth";

const Monthly = () => {
    return (
        <div className="monthly-block content-block">
            <Months needRadio={false} />
            <DaysOfMonth needRadio={true} />
            <EachMinutes needRadio={true} />
            <AtTime needRadio={true} />
        </div>
    );
};

export default Monthly;
