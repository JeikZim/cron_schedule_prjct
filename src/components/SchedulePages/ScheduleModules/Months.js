import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { monthsArr } from "../../../app/availableStates";
import { setMonths } from "../../../app/months";

export const MonthsItem = ({ name }) => {
    const months = useSelector((state) => state.months.value);
    const isChosen = useSelector((state) => state.months.value[name]);
    const dispatch = useDispatch();

    const toggleChose = (event) => {
        dispatch(setMonths({ ...months, [name]: !isChosen }));
    };

    return (
        <div
            onClick={toggleChose}
            className={"months-item" + (isChosen ? " is-chosen" : "")}
        >
            <span>{name}</span>
        </div>
    );
};

export const MonthsList = () => {
    return (
        <div className="months-list">
            {monthsArr.map((month) => {
                return <MonthsItem key={month.id} name={month.name} />;
            })}
        </div>
    );
};

const MonthsBlock = () => {
    return (
        <div className="months schedule-type">
            <h1 className="title">Months</h1>
            <MonthsList />
        </div>
    );
};

export default MonthsBlock;
