import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setScheduleMode } from "../../../app/scheduleType";
import { setValue } from "../../../app/eachMinutes";

const EachMinutes = ({ needRadio }) => {
    const dispatch = useDispatch();
    const scheduleType = useSelector((state) => state.scheduleType.value);
    const eachMinutes = useSelector((state) => state.eachMinutes.value);
    const mode = "each-min";
    const eachMinInput = document.getElementById(mode + "-input");
    let isActive = scheduleType.modes.time === mode;

    return (
        <div
            className={
                mode +
                " each-input schedule-type" +
                (isActive ? "" : " is-disabled")
            }
        >
            {needRadio && (
                <div
                    className={isActive ? "radio active" : "radio"}
                    onClick={() => dispatch(setScheduleMode({ mode }))}
                />
            )}
            <label
                onClick={
                    needRadio
                        ? () => dispatch(setScheduleMode({ mode }))
                        : () => {}
                }
                htmlFor={mode + "-input"}
            >
                {!isActive && <div className="locker" />}
                Each{" "}
                <input
                    id={mode + "-input"}
                    className={isActive ? "" : "is-disabled"}
                    type="text"
                    value={eachMinutes}
                    onKeyDown={enterHandler}
                    onChange={changeHandler}
                    onBlur={onBlurHandler}
                    disabled={!isActive}
                    autoComplete="off"
                />{" "}
                minutes
            </label>
        </div>
    );

    function changeHandler(ev) {
        let val = ev.target.value.replace(/[^0-9]/, "");

        if (val > 60) val = "60";
        if (val.length > 2) val = val.slice(1, 3);

        dispatch(setValue(val));
        val.length >= 2 && eachMinInput.blur();
    }

    function enterHandler(ev) {
        return ev.code === "Enter" && eachMinInput.blur();
    }

    function onBlurHandler(ev) {
        const val = ev.target.value;
        (val === "0" || val === "") && dispatch(setValue("1"));
    }
};

export default EachMinutes;
