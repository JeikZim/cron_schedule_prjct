import { configureStore } from '@reduxjs/toolkit';
import scheduleTypeReducer from './states/scheduleType'
import timesListReducer from './states/timesList'

export default configureStore({
    reducer: {
        scheduleType: scheduleTypeReducer,
        timesList: timesListReducer
    }
})