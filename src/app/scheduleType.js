import { createSlice } from "@reduxjs/toolkit";
import { scheduleTypes } from "./availableStates";

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
            const availableModes = state.value.availableModes;

            for (let i = 0; i < availableModes.length; i++) {
                const modesPair = availableModes[i];

                for (let j = 0; j < modesPair.length; j++) {
                    const mode = modesPair[j];

                    if (mode === action.payload.mode) {
                        state.value.modes[i] = action.payload.mode;
                    }
                }
            }
        },
    },
});

export const { setScheduleType, setScheduleMode } = scheduleTypeSlice.actions;

export default scheduleTypeSlice.reducer;
