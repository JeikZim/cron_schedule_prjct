import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { scheduleTypes } from "../app/availableStates";
import { setLine } from "../app/cronLine";
import {
    atTimeTranslator,
    byDaysOfMonthTranslator,
    daysOfWeekTranslator,
    eachDaysTranslator,
    eachMinutesTranslator,
    monthsTranslator,
} from "../lib/translators";
import Button from "../components/Button";

const SaveLoadButtons = () => {
    const dispatch = useDispatch();
    const scheduleType = useSelector((state) => state.scheduleType.value);

    const times = useSelector((state) => state.timesList.value);
    const eachMinutes = useSelector((state) => state.eachMinutes.value);
    const eachDays = useSelector((state) => state.daysOfMonth.value.eachDays);
    const daysOfMonth = useSelector((state) => state.daysOfMonth.value.days);
    const daysOfWeek = useSelector((state) => state.daysOfWeek.value);
    const months = useSelector((state) => state.months.value);
    // const cronLine = useSelector((state) => state.cronLine.value);

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
        
        switch (scheduleType.type) {
            // Daily
            case scheduleTypes[0].type:
                if (curModes.time === dailyAvailableModes.time[0]) {
                    lines = eachMinutesTranslator([], eachMinutes);
                } else if (curModes.time === dailyAvailableModes.time[1]) {
                    lines = atTimeTranslator([], times);
                }

                dispatch(setLine({ lines }));
                break;

            // Weekly
            case scheduleTypes[1].type:

                if (curModes.time === weeklyAvailableModes.time[0]) {
                    lines = eachMinutesTranslator([], eachMinutes);
                } else if (curModes.time === weeklyAvailableModes.time[1]) {
                    lines = atTimeTranslator([], times);
                }

                lines = daysOfWeekTranslator(lines, daysOfWeek);

                dispatch(setLine({ lines }));
                break;

            // Monthly
            case scheduleTypes[2].type:

                if (curModes.time === monthlyAvailableModes.time[0]) {
                    lines = eachMinutesTranslator(lines, eachMinutes);
                }
                else if (curModes.time === monthlyAvailableModes.time[1]) {
                    lines = atTimeTranslator(lines, times);
                }
                if (curModes.day === monthlyAvailableModes.day[0]) {
                    lines = eachDaysTranslator(lines, eachDays);
                }
                else if (curModes.day === monthlyAvailableModes.day[1]) {
                    lines = byDaysOfMonthTranslator(lines, daysOfMonth);
                }

                lines = monthsTranslator(lines, months);

                dispatch(setLine({ lines }));
                break;
                
            // Custom
            case scheduleTypes[3].type:

                if (curModes.time === monthlyAvailableModes.time[0]) {
                    lines = eachMinutesTranslator(lines, eachMinutes);
                }
                else if (curModes.time === monthlyAvailableModes.time[1]) {
                    lines = atTimeTranslator(lines, times);
                }
                if (curModes.day === monthlyAvailableModes.day[0]) {
                    lines = eachDaysTranslator(lines, eachDays);
                }
                else if (curModes.day === monthlyAvailableModes.day[1]) {
                    lines = byDaysOfMonthTranslator(lines, daysOfMonth);
                }

                lines = daysOfWeekTranslator(lines, daysOfWeek);
                lines = monthsTranslator(lines, months);

                dispatch(setLine({ lines }));

                break;

            default:
                break;
        }
    }

    function loadSchedule() {
        // cronLine
        // .replace(/ +/g, ' ').trim().split(' ');
    }
};

export default SaveLoadButtons;
