import React from "react";
import EachMinutes from "./ScheduleModules/EachMinutes";
import AtTime from "./ScheduleModules/AtTime";

const Daily = () => {
    return (
        <div className="daily-block content-block">
            <EachMinutes needRadio={true} />
            <AtTime needRadio={true} />
        </div>
    );
};

export default Daily;
