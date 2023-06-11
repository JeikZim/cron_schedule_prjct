import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setScheduleType } from "../states/scheduleType";
import ScheduleRouter from "./SchedulePages/ScheduleRouter";
import { scheduleTypes } from "../values";

export const ScheduleTypeItem = (props) => {
    const scheduleType = useSelector((state) => state.scheduleType.value);
    const dispatch = useDispatch();
    const value = props.value;
    let isActive = scheduleType === value;

    return (
        <div className="item" onClick={() => dispatch(setScheduleType(value))}>
            <div className={isActive ? "radio active" : "radio"}></div>
            <input
                className="is-hidden"
                type="radio"
                name="type"
                id={value}
                value={value}
                // onChange={isActive}
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
                        return <ScheduleTypeItem key={index} value={item} />;
                    })}
                </div>
            </div>
            <ScheduleRouter />
        </div>
    );
};

export default Schedule;

/*  
                <div className="month">
                    <label for="" className="month__label">
                        Month
                        <select className="month__select" name="month" id="month">
                            <option value="1">January</option>
                            <option value="2">February</option>
                            
                        </select>
                    </label>
                </div>
                <div className="day-of-month">
                    <label for="" className="day-of-month__label">
                        Day of month

                    </label>
                </div>
                <div className="day-of-week">
                    <label for="" className="day-of-week__label">
                        Every Day
                        <select className="day-of-week__select" name="day-of-week" id="day-of-week">
                            <option value="1">Monday</option>
                            <option value="2">Tuesday</option>
                            <option value="3">Wednesday</option>
                            <option value="4">Thursday</option>
                            <option value="5">Friday</option>
                            <option value="6">Saturday</option>
                            <option value="7">Sunday</option>
                        </select>
                    </label>
                </div>
                <div className="at-time">
                    <h1 className="at-time__h1">At time by number</h1>
                    <div className="at-time__list">
                        <div className="at-time__item">
                            <h2></h2>
                            <label for="" className="at-time__label">At 
                                <input maxlength="2" className="at-time__input" type="text">:<input maxlength="2" className="at-time__input" type="text">
                            </label>
                        </div>
                    </div>
                    <div className="at-time_add">
                        <button className="at-time_button"></button>
                    </div>
                </div>
                <div className="each-min">
                    <label className="each-min__label" for="">Each <input className="each-min__input" type="text"> minutes</label>
                </div> */
