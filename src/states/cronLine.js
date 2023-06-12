import { createSlice } from "@reduxjs/toolkit";

export const cronLineSlice = createSlice({
    name: "cronLine",
    initialState: {
        value: "* * * * *",
    },
    reducers: {
        changeMinutes: (state, action) => {
        },
        changeHours: (state, action) => {
        },
        changeDayOfMonth: (state, action) => {
        },
        changeMonth: (state, action) => {
        },
        changeDayOfWeek: (state, action) => {
        },
        setLine: (state, action) => {
            const cronTimes = state.value.replace(/ +/g, ' ').trim().split(' ')

            cronTimes[0] = action.payload.minutes || '*'    // Minutes
            cronTimes[1] = action.payload.hours || '*'      // Hours
            cronTimes[2] = action.payload.daysOfMonth || '*'// Day
            cronTimes[3] = action.payload.month || '*'      // Week
            cronTimes[4] = action.payload.daysOfWeek || '*' // Month

            state.value = cronTimes.join(' ')
        }
    },
});

export const { changeMinutes, changeHours, changeDayOfMonth, changeMonth, changeDayOfWeek, setLine } = cronLineSlice.actions;

export default cronLineSlice.reducer;
