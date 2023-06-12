import { createSlice } from "@reduxjs/toolkit";
import { scheduleTypes } from "../values";

export const scheduleTypeSlice = createSlice({
    name: "scheduleType",
    initialState: {
        value: scheduleTypes[0],
    },
    reducers: {
        setScheduleType: (state, action) => {
            const arr = scheduleTypes.filter(el => el.type === action.payload.type)

            if (arr && arr.length === 1) {
                state.value = arr[0];
            }
        },
        setScheduleMode: (state, action) => {
            state.value.mode = action.payload.mode
        },
    },
});

export const { setScheduleType, setScheduleMode } = scheduleTypeSlice.actions;

export default scheduleTypeSlice.reducer;
