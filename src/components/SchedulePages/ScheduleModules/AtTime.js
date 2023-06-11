import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../Button";
import { ReactComponent as TrashIcon } from "../../../assets/trash_icon.svg";
import { addTime, removeTime } from "../../../states/timesList";

export const AtTimeItem = (props) => {
    const [time, setTime] = useState({
        hours: props.hours,
        minutes: props.minutes,
    });

    function timeInput(maxVal, maxLength, timeType) {
        return (ev) => {
            const val = ev.target.value.replace(/[^0-9]/, "");

            if (val.length > maxLength) {
                if (Number(val) === 0) {
                    setTime({ ...time, [timeType]: "00" });
                } else {
                    if (timeType === "hours") {
                        let minutes = val[val.length - 1]; //(val[val.length - 1] + time.minutes).slice(0, 2)
                        const hours = val.slice(0, 2);

                        // minutes = minutes > 59 ? 59 : minutes;
                        setTime({ minutes, hours });
                    } else {
                        setTime({
                            ...time,
                            [timeType]: val.slice(0, maxLength),
                        });
                    }
                }
            } else if (Number(val) > maxVal) {
                setTime({ ...time, [timeType]: maxVal });
            } else {
                setTime({ ...time, [timeType]: val });
            }

            if (val.length > maxLength) {
                if (timeType === "hours") {
                    document.getElementById("AtTimeMinutes").focus();
                } else {
                    document.getElementById("AtTimeMinutes").blur();
                }
            }
        };
    }

    return (
        <div key={props.id} className="item at-time__item">
            <h2 className="title">№{props.id}</h2>
            <label htmlFor="AtTimeHours">
                At
                <input
                    id="AtTimeHours"
                    type="text"
                    value={time.hours}
                    onChange={timeInput(23, 2, "hours")}
                />
                :
                <input
                    id="AtTimeMinutes"
                    type="text"
                    value={time.minutes}
                    onChange={timeInput(59, 2, "minutes")}
                />
            </label>
            <div className="btn-div" onClick={props.onRemove}>
                <TrashIcon className="" alt="Trash icon" />
            </div>
        </div>
    );
};

export const AtTimeList = () => {
    const timesList = useSelector((state) => state.timesList.value);
    const dispatch = useDispatch();

    const addHandler = (ev) => {
        const len = timesList.length;
        const id = len > 0 ? timesList[len - 1].id + 1 : 1;
        dispatch(addTime({ id, hours: "", minutes: "" }));
    };
    
    const makeRemoveHandler = (id) => {
        return (ev) => {
            dispatch(removeTime({id}))
        }
    };

    return (
        <div className="at-time-list">
            <div className="add">
                <Button name="Add" onClick={addHandler} />
            </div>
            {timesList.map((item) => (
                <AtTimeItem
                    key={item.id}
                    id={item.id}
                    hours={item.hours}
                    minutes={item.minutes}
                    onRemove={makeRemoveHandler(item.id)}
                />
            ))}
        </div>
    );
};

const AtTimeBlock = () => {
    return (
        <div className="at-time">
            <h1 className="title">At time by number</h1>
            <AtTimeList />
        </div>
    );
};

export default AtTimeBlock;
