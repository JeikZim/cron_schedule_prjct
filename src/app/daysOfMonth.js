import { createSlice } from "@reduxjs/toolkit";

export const daysOfMonthSlice = createSlice({
    name: "daysOfMonth",
    initialState: {
        value: {
            mode: "by-days-of-months",
            eachDays: 1,
            days: []
        },
    },
    reducers: {
        addDayOfMonth: (state, action) => {
            state.value.days.push(action.payload);
        },
        removeDayOfMonth: (state, action) => {
            if (state.value.days.includes(action.payload)) {
                state.value.days = state.value.days.filter((el) => el !== action.payload);
            }
        },
        setEachDaysOfMonth: (state, action) => {
            state.value.eachDays = action.payload;
        },
        setDaysOfMonthMode: (state, action) => {
            state.value = {
                ...state.value,
                mode: action.payload.mode,
            }
        }
    },
});

export const { addDayOfMonth, removeDayOfMonth, setEachDaysOfMonth, setDaysOfMonthMode } = daysOfMonthSlice.actions;

export default daysOfMonthSlice.reducer;
