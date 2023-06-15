import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { daysOfWeekArr } from "../../../app/availableStates";
import { setDaysOfWeek } from "../../../app/daysOfWeek";

export const DaysOfWeekItem = ({ name }) => {
    const daysOfWeek = useSelector((state) => state.daysOfWeek.value);
    const isChosen = useSelector((state) => state.daysOfWeek.value[name]);
    const dispatch = useDispatch();

    const toggleChose = () => {
        dispatch(setDaysOfWeek({ ...daysOfWeek, [name]: !isChosen }));
    };

    return (
        <div
            onClick={toggleChose}
            className={"days-of-week-item" + (isChosen ? " is-chosen" : "")}
        >
            <span>{name}</span>
        </div>
    );
};

export const DaysOfWeekList = () => {
    return (
        <div className="days-of-week-list">
            {daysOfWeekArr.map((day) => {
                return <DaysOfWeekItem key={day.id} name={day.name} />;
            })}
        </div>
    );
};

const DaysOfWeekBlock = () => {
    return (
        <div className="days-of-week schedule-type">
            <h1 className="title">Days of the week</h1>
            <DaysOfWeekList />
        </div>
    );
};

export default DaysOfWeekBlock;
