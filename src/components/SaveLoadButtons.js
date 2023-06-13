import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { scheduleTypes } from '../app/availableStates';
import { setLine } from "../app/cronLine";
import Button from '../components/Button';

const SaveLoadButtons = () => {
    const dispatch = useDispatch();
    const scheduleType =  useSelector((state) => state.scheduleType.value);

    const times = useSelector((state) => state.timesList.value);
    const eachMinutes = useSelector((state) => state.eachMinutes.value);
    const daysOfWeek = useSelector((state) => state.daysOfWeek.value)
    const cronData = useSelector((state) => state.cronLine.value);

    return (
        <div className="btn-group">
            <Button isActive={true} name='Load' onClick={loadSchedule} />
            <Button isActive={true} name='Save' onClick={saveSchedule} />
        </div>
    )

    function saveSchedule() {
        switch (scheduleType.type) {
            // Daily
            case scheduleTypes[0].type:
                const mode = scheduleType.modes[0];
                const modeOne = scheduleTypes[0].availableModes[0][0];
                const modeTwo = scheduleTypes[0].availableModes[0][1];

                if (mode === modeOne) {
                    const minutes = `*/${eachMinutes}`;
                    dispatch(setLine({ lines: [{ minutes }] }));
                }
                else if (mode === modeTwo) {
                    const lines = [];
        
                    for (let i = 0; i < times.length; i++) {
                        const time = times[i];
                        const hours = time.hours;
                        const minutes = time.minutes;

                        lines.push({ minutes, hours });
                    }
                    
                    dispatch(setLine({ lines }));
                }
                break;

            // Weekly
            case scheduleTypes[1].type:
                
                const lines = [];
                const activeDaysOfWeek = [];

                for (const dayName in daysOfWeek) {
                    if (Object.hasOwnProperty.call(daysOfWeek, dayName)) {
                        const dayValue = daysOfWeek[dayName];

                        if (dayValue) {
                            activeDaysOfWeek.push(dayName);
                        }
                    }
                }
                
                let activeDaysOfWeekString = activeDaysOfWeek.join(',')

                if (activeDaysOfWeek.length === 7 || activeDaysOfWeek.length === 0) {
                    activeDaysOfWeekString = "*";
                }

                for (let i = 0; i < times.length; i++) {
                    const time = times[i];
                    const hours = time.hours;
                    const minutes = time.minutes;

                    lines.push({ minutes, hours, daysOfWeek: activeDaysOfWeekString });
                }

                if (times.length === 0) {
                    lines.push({ daysOfWeek: activeDaysOfWeekString });
                }

                dispatch(setLine({ lines }));
                
                break;

            // Monthly
            case scheduleTypes[2].type:
                
                break;
            // Custom
            case scheduleTypes[3].type:
                
                break;
        
            default:
                break;
        }
    }

    function loadSchedule() {

    }
}

export default SaveLoadButtons;

