import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setScheduleMode } from "../../../app/scheduleType";
import { monthDaysArr } from "../../../app/availableStates";
import {
    addDayOfMonth,
    removeDayOfMonth,
    setEachDaysOfMonth,
    setDaysOfMonthMode,
} from "../../../app/daysOfMonth";

export const EachDays = (props) => {
    const dispatch = useDispatch();
    const scheduleType = useSelector((state) => state.scheduleType.value);
    const daysOfMonth = useSelector((state) => state.daysOfMonth.value);
    const eachDays = daysOfMonth.eachDays;
    const mode = "each-days-of-month";
    const eachDaysInput = document.getElementById(mode + "-input");
    let isActive = scheduleType.modes[1] === mode;

    return (
        <div
            className={
                mode +
                " each-input schedule-type" +
                (isActive ? "" : " is-disabled")
            }
        >
            {props.needRadio && (
                <div
                    className={isActive ? "radio active" : "radio"}
                    onClick={() => {
                        dispatch(setScheduleMode({ mode }));
                        dispatch(setDaysOfMonthMode({ mode }));
                    }}
                />
            )}
            <label
                htmlFor={mode + "-input"}
                onClick={
                    props.needRadio
                        ? () => {
                              dispatch(setScheduleMode({ mode }));
                              dispatch(setDaysOfMonthMode({ mode }));
                          }
                        : () => {}
                }
            >
                {!isActive && <div className="locker" />}
                Each{" "}
                <input
                    id={mode + "-input"}
                    className={isActive ? "" : "is-disabled"}
                    type="text"
                    value={eachDays}
                    onKeyDown={enterHandler}
                    onChange={changeHandler}
                    onBlur={onBlurHandler}
                    disabled={!isActive}
                />{" "}
                days of the month
            </label>
        </div>
    );

    function changeHandler(ev) {
        let val = ev.target.value.replace(/[^0-9]/, "");

        if (val > 31) val = "31";
        if (val.length > 2) val = val.slice(1, 3);

        dispatch(setEachDaysOfMonth(val));
        val.length >= 2 && eachDaysInput.blur();
    }

    function enterHandler(ev) {
        return ev.code === "Enter" && eachDaysInput.blur();
    }

    function onBlurHandler(ev) {
        const val = ev.target.value;
        (val === "0" || val === "00" || val === "") &&
            dispatch(setEachDaysOfMonth("1"));
    }
};

export const DaysOfMonthItem = (props) => {
    const id = props.id;
    const daysOfMonth = useSelector((state) => state.daysOfMonth.value);
    let isChosen = daysOfMonth.days.includes(id);
    const isActive = props.isActive;
    const dispatch = useDispatch();

    const toggleChose = () => {
        dispatch(isChosen ? removeDayOfMonth(id) : addDayOfMonth(id));
    };

    return (
        <div
            onClick={isActive ? toggleChose : () => {}}
            className={"days-of-month-item" + (isChosen ? " is-chosen" : "")}
        >
            <span>{id}</span>
        </div>
    );
};

export const DaysOfMonthList = (props) => {
    return (
        <div className="days-of-month-list">
            {props.isActive ? true : <div className="locker" />}
            {monthDaysArr.map((num) => {
                return (
                    <DaysOfMonthItem
                        key={num}
                        id={num}
                        isActive={props.isActive}
                    />
                );
            })}
        </div>
    );
};

export const ByDaysOfMonth = (props) => {
    const dispatch = useDispatch();
    const scheduleType = useSelector((state) => state.scheduleType.value);
    const mode = "by-days-of-months";
    const isActive = !props.needRadio || scheduleType.modes[1] === mode;

    return (
        <div
            className={
                mode + " schedule-type" + (isActive ? "" : " is-disabled")
            }
        >
            <h1
                className="title"
                onClick={() => {
                    dispatch(setScheduleMode({ mode }));
                }}
            >
                {props.needRadio && (
                    <div className={isActive ? "radio active" : "radio"} />
                )}
                By days of the month
            </h1>
            <DaysOfMonthList isActive={isActive} />
        </div>
    );
};

const DaysOfMonthBlock = () => {
    return (
        <div className="days-of-month schedule-type">
            <h1 className="title">Days of the month</h1>
            <EachDays needRadio={true} />
            <ByDaysOfMonth needRadio={true} />
        </div>
    );
};

export default DaysOfMonthBlock;
