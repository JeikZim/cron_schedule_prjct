import { configureStore } from '@reduxjs/toolkit';
import scheduleTypeReducer from './states/scheduleType'
import timesListReducer from './states/timesList'
import eachMinutesReducer from './states/eachMinutes'
import cronLineReducer from "./states/cronLine";

export default configureStore({
    reducer: {
        scheduleType: scheduleTypeReducer,
        timesList: timesListReducer,
        eachMinutes: eachMinutesReducer,
        cronLine: cronLineReducer
    }
})