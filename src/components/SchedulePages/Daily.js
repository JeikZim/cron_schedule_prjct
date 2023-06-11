import React from "react";
import EachMinutes from './ScheduleModules/EachMinutes'
import AtTime from "./ScheduleModules/AtTime";

const Daily = () => {
    return (
        <div className="daily-block">
            <EachMinutes />
            <AtTime />
        </div>
    );
};

export default Daily