import React from 'react'
import Schedule from './components/Schedule'
import CronLine from './components/CronLine';
import Button from './components/Button';
import { useSelector, useDispatch } from "react-redux";
import { scheduleTypes } from './values';
import { setLine } from "./states/cronLine";

function App() {
    const scheduleType =  useSelector((state) => state.scheduleType.value);
    const times = useSelector((state) => state.timesList.value);
    const eachMinutes = useSelector((state) => state.eachMinutes.value);
    const cronData = useSelector((state) => state.cronLine.value);
    const dispatch = useDispatch();

    const load = () => {

    }

    return (
        <div className="container">
            <Schedule />
            <div className="btn-group">
                <Button isActive={true} name='Load' onClick={load} />
                <Button isActive={true} name='Save' onClick={saveSchedule} />
            </div>
            <CronLine />
        </div>
    )

    function saveSchedule() {
    
        switch (scheduleType.type) {
            // Daily
            case scheduleTypes[0].type:
                if (scheduleType.mode === scheduleTypes[0].availableModes[0]) {
                    const minutesLine = `*/${eachMinutes}`
                    dispatch(setLine({ minutes: minutesLine }))
                }
                else if (scheduleType.mode === scheduleTypes[0].availableModes[1]) {
                    let hoursLine = "";
                    let minutesLine = "";
        
                    for (let i = 0; i < times.length; i++) {
                        const time = times[i];
                        const hours = time.hours;
                        const minutes = time.minutes;
                        
                        minutesLine = minutesLine + minutes + ',' ;
                        hoursLine = hoursLine + hours + ',';
        
                        if (i === times.length - 1) {
                            minutesLine = minutesLine.slice(0, minutesLine.length - 1);
                            hoursLine = hoursLine.slice(0, hoursLine.length - 1);
                        }
                    }
                    dispatch(setLine({minutes: minutesLine, hours: hoursLine}))
                }
                break;
            // Weekly
            case scheduleTypes[1].type:
                
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
}

export default App;

