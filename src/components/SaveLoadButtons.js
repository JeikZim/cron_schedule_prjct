import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { scheduleTypes } from "../app/availableStates";
import { setLine } from "../app/cronLine";
import {
    commonTimeConvertor,
    commonDaysConvertor,
    daysOfWeekConvertor,
    monthsConvertor,
} from "../lib/convertors";
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

    return (
        <div className="btn-group">
            <Button isActive={true} name="Load" onClick={loadSchedule} />
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

                dispatch(setLine({ lines }));
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

                dispatch(setLine({ lines }));
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

                dispatch(setLine({ lines }));
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

                dispatch(setLine({ lines }));
                break;

            default:
                console.err("Invalid scheduleType");
                break;
        }
    }

    function loadSchedule() {
        // cronLine
        // .replace(/ +/g, ' ').trim().split(' ');
    }
};

export default SaveLoadButtons;
