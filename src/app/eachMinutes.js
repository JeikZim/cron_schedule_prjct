import { createSlice } from "@reduxjs/toolkit";

export const eachMinutesSlice = createSlice({
    name: "eachMinutes",
    initialState: {
        value: "1",
    },
    reducers: {
        setValue: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setValue } = eachMinutesSlice.actions;

export default eachMinutesSlice.reducer;
