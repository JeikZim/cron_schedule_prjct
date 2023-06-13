import { createSlice } from "@reduxjs/toolkit";

export const daysOfWeekSlice = createSlice({
    name: "daysOfWeek",
    initialState: {
        value: {
            MON: false,
            TUE: false,
            WED: false,
            THU: false,
            FRI: false,
            SUT: false,
            SUN: false,
        },
    },
    reducers: {
        setDaysOfWeek: (state, action) => {
            state.value.MON = action.payload.MON || false;
            state.value.TUE = action.payload.TUE || false;
            state.value.WED = action.payload.WED || false;
            state.value.THU = action.payload.THU || false;
            state.value.FRI = action.payload.FRI || false;
            state.value.SUT = action.payload.SUT || false;
            state.value.SUN = action.payload.SUN || false;
        },
    },
});

export const { setDaysOfWeek } = daysOfWeekSlice.actions;

export default daysOfWeekSlice.reducer;
