import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import { composeWithDevTools } from "redux-devtools-extension";
import scheduleTypeReducer from './scheduleType'
import cronLineReducer from "./cronLine";
import eachMinutesReducer from './eachMinutes'
import timesListReducer from './timesList'
import daysOfWeekReducer from "./daysOfWeek";
import monthsReducer from "./months";
import daysOfMonthReducer from "./daysOfMonth";

export default configureStore({
    reducer: {
        scheduleType: scheduleTypeReducer,
        timesList: timesListReducer,
        eachMinutes: eachMinutesReducer,
        cronLine: cronLineReducer,
        daysOfWeek: daysOfWeekReducer,
        months: monthsReducer,
        daysOfMonth: daysOfMonthReducer
    },
    devTools: process.env.NODE_ENV !== 'production',
    enhancers: applyMiddleware([composeWithDevTools])
})