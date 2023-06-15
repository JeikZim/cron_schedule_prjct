import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { scheduleTypes } from "../app/availableStates";
import { setLines } from "../app/cronLines";
import {
    commonTimeConvertor,
    commonDaysConvertor,
    daysOfWeekConvertor,
    monthsConvertor,
} from "../lib/convertors";
import Button from "../components/Button";
import { logDOM } from "@testing-library/react";

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
    const [loadActive, setLoadActive] = useState(true)

    // useEffect(() => {
    //     setLoadActive(isValidGlobal);
    // })

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
        console.log(isValidGlobal);
        if (!isValidGlobal) return;

        setLoadActive(false);

        try {
            const body = JSON.stringify({ cronLines: localLines });

            let response = await fetch("/api/cron/create", {
                method: "POST",
                body,
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
            });
            console.log(response);

            const data = await response.json();

            console.log(data);

            if (!response.ok) {
                throw new Error(data.message || "Request error.");
            }


            setLoadActive(true);
            return data;
        } catch (err) {
            console.log(err);
        }
    }
};

export default SaveLoadButtons;
