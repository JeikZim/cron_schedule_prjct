import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fillingListData, fillingNamedData } from "../lib/fillingData"
import {
    commonTimeConvertor,
    commonDaysConvertor,
    daysOfWeekConvertor,
    monthsConvertor,
} from "../lib/convertors";
import {
    scheduleTypes,
    daysOfWeekArr,
    monthsArr,
} from "../app/availableStates";
import { setScheduleType, setScheduleMode } from "../app/scheduleType";
import { setLines } from "../app/cronLines";
import { setValue as setEachMinutes } from "../app/eachMinutes";
import { setTime, setMinutes, setHours } from "../app/timesList";
import { setDaysOfMonth, setEachDaysOfMonth } from "../app/daysOfMonth";
import { setEachMonths, setMonths } from "../app/months";
import { setDaysOfWeek, setEachDayOfWeek } from "../app/daysOfWeek";
import Button from "../components/Button";

const SaveLoadButtons = () => {
    const dispatch = useDispatch();
    const scheduleType = useSelector((state) => state.scheduleType.value);

    const eachMinutes = useSelector((state) => state.eachMinutes.value);
    const times = useSelector((state) => state.timesList.value);
    const eachDays = useSelector((state) => state.daysOfMonth.value.eachDays);
    const daysOfMonth = useSelector((state) => state.daysOfMonth.value.days);
    const daysOfWeek = useSelector((state) => state.daysOfWeek.value);
    const months = useSelector((state) => state.months.value);
    const localLines = useSelector((state) => state.cronLocalLines.value);
    const isValidGlobal = useSelector((state) => state.cronLocalLines.isValid);
    const [loadActive, setLoadActive] = useState(true);

    useEffect(() => {
        setLoadActive(isValidGlobal);
    }, [isValidGlobal]);

    return (
        <div className="btn-group">
            <Button isActive={loadActive} name="Load" onClick={loadSchedule} />
            <Button isActive={true} name="Save" onClick={saveSchedule} />
        </div>
    );

    function saveSchedule() {
        let lines = [];
        const curModes = scheduleType.modes;
        const dailyAvailableModes = scheduleTypes[0].availableModes;
        const weeklyAvailableModes = scheduleTypes[1].availableModes;
        const monthlyAvailableModes = scheduleTypes[2].availableModes;
        const customAvailableModes = scheduleTypes[3].availableModes;

        switch (scheduleType.type) {
            // Daily
            case scheduleTypes[0].type:
                lines = commonTimeConvertor(
                    lines,
                    curModes.time,
                    dailyAvailableModes.time,
                    { eachMinutes, times }
                );

                dispatch(setLines({ lines }));
                break;

            // Weekly
            case scheduleTypes[1].type:
                lines = commonTimeConvertor(
                    lines,
                    curModes.time,
                    weeklyAvailableModes.time,
                    { eachMinutes, times }
                );
                lines = daysOfWeekConvertor(lines, daysOfWeek);

                dispatch(setLines({ lines }));
                break;

            // Monthly
            case scheduleTypes[2].type:
                lines = commonTimeConvertor(
                    lines,
                    curModes.time,
                    monthlyAvailableModes.time,
                    { eachMinutes, times }
                );
                lines = commonDaysConvertor(
                    lines,
                    curModes.day,
                    monthlyAvailableModes.day,
                    { eachDays, daysOfMonth }
                );
                lines = monthsConvertor(lines, months);

                dispatch(setLines({ lines }));
                break;

            // Custom
            case scheduleTypes[3].type:
                lines = commonTimeConvertor(
                    lines,
                    curModes.time,
                    customAvailableModes.time,
                    { eachMinutes, times }
                );
                lines = commonDaysConvertor(
                    lines,
                    curModes.day,
                    customAvailableModes.day,
                    { eachDays, daysOfMonth }
                );
                lines = daysOfWeekConvertor(lines, daysOfWeek);
                lines = monthsConvertor(lines, months);

                dispatch(setLines({ lines }));
                break;

            default:
                console.err("Invalid scheduleType");
                break;
        }
    }

    async function loadSchedule() {
        if (!isValidGlobal) return;

        setLoadActive(false);

        try {
            // const body = JSON.stringify({ cronLines: localLines });

            // let response = await fetch("/api/cron/create", {
            //     method: "POST",
            //     body,
            //     headers: {
            //         "Content-Type": "application/json;charset=utf-8",
            //     },
            // });

            // const data = await response.json();

            // if (!response.ok) {
            //     throw new Error(data.message || "Request error.");
            // }

            // let line = data.lines[0].split(" ");
            // filledScheduleData(line);
            filledScheduleData(localLines);

            setLoadActive(true);
            // return data;
        } catch (err) {
            console.error(err);
        }
    }

    function filledScheduleData(line) {
        const minutes = line[0];
        const hours = line[1];
        const daysOfMonth = line[2];
        const months = line[3];
        const daysOfWeek = line[4];

        if (daysOfMonth === "*" && months === "*" && daysOfWeek === "*") {
            dispatch(setScheduleType({ type: "Daily" }));
        } 
        else if (daysOfMonth === "*" && months === "*") {
            dispatch(setScheduleType({ type: "Weekly" }));
        } 
        else if (daysOfWeek === "*") {
            dispatch(setScheduleType({ type: "Monthly" }));
        }
        else {
            dispatch(setScheduleType({ type: "Custom" }));
        }

        if (minutes === "*" && hours === "*") {
            dispatch(setScheduleMode({ mode: "each-min" }));
            dispatch(setEachMinutes(1));
        }
        else if (minutes.startsWith("*/") && hours === "*") {
            dispatch(setScheduleMode({ mode: "each-min" }));
            let tmp = minutes.split('/')[1];;

            if (Number(tmp) > 60) {
                dispatch(setEachMinutes(60));
                
            } else {
                dispatch(setEachMinutes(tmp));
            }
        } else {
            dispatch(setScheduleMode({ mode: "at-time" }));
            fillingListData(dispatch, minutes, 0, 60, setMinutes);
            fillingListData(dispatch, hours, 0, 24, setHours);
        }

        if (daysOfMonth === "*") {
            dispatch(setScheduleMode({ mode: "each-days-of-month" }));
            dispatch(setEachDaysOfMonth(1));
        }
        else if (daysOfMonth.startsWith("*/")) {
            dispatch(setScheduleMode({ mode: "each-days-of-month" }));
            let tmp = daysOfMonth.split('/')[1];;

            if (Number(tmp) > 31) {
                dispatch(setEachDaysOfMonth(31));
                
            } else {
                dispatch(setEachDaysOfMonth(tmp));
            }
        } else {
            fillingListData(
                dispatch,
                daysOfMonth,
                1,
                31,
                setDaysOfMonth,
                setEachDaysOfMonth
            );
        }

        fillingNamedData(dispatch,months, 1, 12, monthsArr, setMonths, setEachMonths);
        fillingNamedData(
            dispatch,
            daysOfWeek,
            1,
            7,
            daysOfWeekArr,
            setDaysOfWeek,
            setEachDayOfWeek
        );
    }
};

export default SaveLoadButtons;
