import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../Button";
import { setScheduleMode } from "../../../app/scheduleType";
import { addTime, removeTime, setTime } from "../../../app/timesList";
import { ReactComponent as TrashIcon } from "../../../assets/trash_icon.svg";

export const AtTimeItem = (props) => {
    const id = props.id;
    const time = useSelector((state) => state.timesList.value[id - 1]);
    const dispatch = useDispatch();

    let minutesInputDOM = null;
    useEffect(() => {
        minutesInputDOM = document.getElementById("at-time-minutes" + id)
    })

    const changeHoursHandler = (ev) => {
        const val = ev.target.value.replace(/[^0-9]/, "");
        const minutes = time.minutes;

        if (val.length > 2) {
            if (Number(val) === 0) {
                dispatch(setTime({ id, hours: "00", minutes }));
            } else {
                const minutes = val[val.length - 1];
                const hours = val.slice(0, 2);

                dispatch(setTime({ id, hours, minutes }));
            }
        } else if (Number(val) > 23) {
            dispatch(setTime({ id, hours: 23, minutes }));
        } else {
            dispatch(setTime({ id, hours: val, minutes }));
        }

        val.length >= 2 && minutesInputDOM.focus();
    };

    const changeMinutesHandler = (ev) => {
        const val = ev.target.value.replace(/[^0-9]/, "");
        const hours = time.hours;

        if (val.length > 2) {
            if (Number(val) === 0) {
                dispatch(setTime({ id, hours, minutes: "00" }));
            } else {
                dispatch(setTime({ id, hours, minutes: val.slice(0, 2) }));
            }
        } else if (Number(val) > 59) {
            dispatch(setTime({ id, hours, minutes: 59 }));
        } else {
            dispatch(setTime({ id, hours, minutes: val }));
        }

        val.length > 2 && minutesInputDOM.blur();
    };

    const removeHandler = (ev) => dispatch(removeTime({ id }));

    const changeFocusByEnter = (action) => {
        return (ev) => ev.code === "Enter" && minutesInputDOM[action]();
    };

    const makeBlurHandler = (timeType) => {
        return (ev) => {
            const val = ev.target.value;
            (val === "0" || val === "") &&
                dispatch(setTime({ ...time, [timeType]: "00" }));
        };
    };

    return (
        <div key={id} className="item at-time__item">
            <h2 className="title">№{id}</h2>
            <label htmlFor="AtTimeHours">
                At
                <input
                    id={"at-time-hours" + id}
                    className={props.isActive ? "" : "is-disabled"} 
                    type="text"
                    value={time.hours}
                    onChange={changeHoursHandler}
                    onKeyDown={changeFocusByEnter("focus")}
                    onBlur={makeBlurHandler("hours")}
                />
                :
                <input
                    id={"at-time-minutes" + id}
                    className={props.isActive ? "" : "is-disabled"} 
                    type="text"
                    value={time.minutes}
                    onChange={changeMinutesHandler}
                    onKeyDown={changeFocusByEnter("blur")}
                    onBlur={makeBlurHandler("minutes")}
                />
            </label>
            <div className="btn-div" onClick={removeHandler}>
                <TrashIcon className={props.isActive ? "" : "is-disabled"} alt="Trash icon" />
            </div>
        </div>
    );
};

export const AtTimeList = (props) => {
    const timesList = useSelector((state) => state.timesList.value);
    const dispatch = useDispatch();

    const addHandler = (ev) => {
        const len = timesList.length;

        const id = len > 0 ? timesList[len - 1].id + 1 : 1;
        dispatch(addTime({ id, hours: "00", minutes: "00" }));
    };

    return (
        <div className="at-time-list">
            {props.isActive ? true : <div className="locker" />}
            <div className="add">
                <Button
                    isActive={props.isActive}
                    name="Add"
                    onClick={addHandler}
                />
            </div>
            {timesList.map((item) => (
                <AtTimeItem
                    isActive={props.isActive}
                    key={item.id}
                    id={item.id}
                    hours={item.hours}
                    minutes={item.minutes}
                />
            ))}
        </div>
    );
};

const AtTimeBlock = (props) => {
    const dispatch = useDispatch();
    const scheduleType = useSelector((state) => state.scheduleType.value);
    const mode = "at-time";
    let isActive = !props.needRadio || scheduleType.modes[0] === mode;

    return (
        <div className={mode + (isActive ? "" : " is-disabled")}>
            <h1 className="title">
                {
                    props.needRadio && <div
                        className={isActive ? "radio active" : "radio"}
                        onClick={() => dispatch(setScheduleMode({ mode }))}
                    />
                }
                At time by number
            </h1>
            <AtTimeList isActive={isActive} />
        </div>
    );
};

export default AtTimeBlock;
