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
        switch (scheduleType.type) {
            // Daily
            case scheduleTypes[0].type:
                const mode = scheduleType.modes[0];
                const modeOne = scheduleTypes[0].availableModes[0][0];
                const modeTwo = scheduleTypes[0].availableModes[0][1];

                if (mode === modeOne) {
                    lines = eachMinutesTranslator([], eachMinutes);
                } else if (mode === modeTwo) {
                    lines = atTimeTranslator([], times);
                }

                dispatch(setLine({ lines }));
                break;

            // Weekly
            case scheduleTypes[1].type:
                lines = atTimeTranslator(lines, times);
                lines = daysOfWeekTranslator(lines, daysOfWeek);

                dispatch(setLine({ lines }));
                break;

            // Monthly
            case scheduleTypes[2].type:
                const timesMode = scheduleType.modes[0];
                const daysMode = scheduleType.modes[1];
                const availableTimesModes = scheduleTypes[2].availableModes[0];
                const availableDaysModes = scheduleTypes[2].availableModes[1];

                if (timesMode === availableTimesModes[0]) {
                    lines = eachMinutesTranslator(lines, eachMinutes);
                }
                else if (timesMode === availableTimesModes[1]) {
                    lines = atTimeTranslator(lines, times);
                }
                if (daysMode === availableDaysModes[0]) {
                    lines = eachDaysTranslator(lines, eachDays);
                }
                else if (daysMode === availableDaysModes[1]) {
                    lines = byDaysOfMonthTranslator(lines, daysOfMonth);
                }

                lines = monthsTranslator(lines, months);

                dispatch(setLine({ lines }));
                break;
                
            // Custom
            case scheduleTypes[3].type:
                //

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
