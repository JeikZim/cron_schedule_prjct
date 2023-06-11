import { createSlice } from "@reduxjs/toolkit";
import { scheduleTypes } from "../values";

export const scheduleTypeSlice = createSlice({
    name: "scheduleType",
    initialState: {
        value: "Daily",
    },
    reducers: {
        setScheduleType: (state, action) => {
            if (scheduleTypes.filter(el => el === action.payload )) {
                state.value = action.payload;
            }
        },
    },
});

export const { setScheduleType } = scheduleTypeSlice.actions;

export default scheduleTypeSlice.reducer;
