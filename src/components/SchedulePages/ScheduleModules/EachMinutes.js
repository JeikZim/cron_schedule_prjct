import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setScheduleMode } from "../../../states/scheduleType";
import { setValue } from "../../../states/eachMinutes";

const EachMinutes = () => {
    const dispatch = useDispatch();
    const scheduleType = useSelector((state) => state.scheduleType.value);
    const eachMinutes = useSelector((state) => state.eachMinutes.value);
    const mode = "each-min";
    const eachMinInput = document.getElementById(mode + "-input");
    let isActive = scheduleType.mode === mode;

    const changeHandler = (ev) => {
        let val = ev.target.value.replace(/[^0-9]/, "");

        if (val > 60) {
            val = "60";
        }
        if (val.length > 2) {
            val = val.slice(1, 3);
        }

        dispatch(setValue(val));
        val.length >= 2 && eachMinInput.blur();
    };

    const enterHandler = (ev) => ev.code === "Enter" && eachMinInput.blur();

    const onBlurHandler = (ev) => {
            const val = ev.target.value;
            (val === "0" || val === "") &&
                dispatch(setValue("1"));
        };

    return (
        <div className={mode + ( isActive ? "" : " is-disabled" )}>
            <div
                className={isActive ? "radio active" : "radio"}
                onClick={() =>
                    dispatch(setScheduleMode({ mode }))
                }
            />
            <label htmlFor={mode + "-input"}>
            {!isActive && <div className="locker" />}
                Each{" "}
                <input
                    id={mode + "-input"}
                    className={ isActive ? "" : "is-disabled" }
                    type="text"
                    value={eachMinutes}
                    onKeyDown={enterHandler}
                    onChange={changeHandler}
                    onBlur={onBlurHandler}
                    disabled={!isActive}
                />{" "}
                minutes
            </label>
        </div>
    );
};

export default EachMinutes;
