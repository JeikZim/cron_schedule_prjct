import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setScheduleType } from "../app/scheduleType";
import ScheduleRouter from "./SchedulePages/ScheduleRouter";
import { scheduleTypes } from "../app/availableStates";

export const ScheduleTypeItem = ({ value }) => {
    const scheduleType = useSelector((state) => state.scheduleType.value);
    const dispatch = useDispatch();
    let isActive = scheduleType.type === value;

    return (
        <div
            className="item"
            onClick={() =>
                dispatch(setScheduleType({ ...scheduleType, type: value }))
            }
        >
            <div className={isActive ? "radio active" : "radio"}></div>
            <input
                className="is-hidden"
                type="radio"
                name="type"
                id={value}
                value={value}
            />
            <label htmlFor={value}>{value}</label>
        </div>
    );
};

const Schedule = () => {
    return (
        <div className="schedule">
            <header>
                <span className="text">Schedule</span>
            </header>
            <div className="sidebar">
                <div className="types">
                    {scheduleTypes.map((item, index) => {
                        return (
                            <ScheduleTypeItem key={index} value={item.type} />
                        );
                    })}
                </div>
            </div>
            <ScheduleRouter />
        </div>
    );
};

export default Schedule;
