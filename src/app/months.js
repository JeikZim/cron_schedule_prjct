import { createSlice } from "@reduxjs/toolkit";

export const monthsSlice = createSlice({
    name: "months",
    initialState: {
        value: {
            JAN: false,
            FEB: false,
            MAR: false,
            APR: false,
            MAY: false,
            JUN: false,
            JUL: false,
            AUG: false,
            SEP: false,
            OCT: false,
            NOV: false,
            DEC: false,
        },
    },
    reducers: {
        setMonths: (state, action) => {
            for (const month in action.payload) {
                if (Object.hasOwnProperty.call(action.payload, month)) {
                    state.value[month] = action.payload[month] || false;
                }
            }
        },
        setEachMonths: (state) => {
            for (const month in state.value) {
                if (Object.hasOwnProperty.call(state.value, month)) {
                    state.value[month] = false;
                }
            }
        }
    },
});

export const { setMonths, setEachMonths } = monthsSlice.actions;

export default monthsSlice.reducer;
