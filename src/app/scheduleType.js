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

            for (const key in availableModes) {
                if (Object.hasOwnProperty.call(availableModes, key)) {
                    const modes = availableModes[key];
                    
                    for (let j = 0; j < modes.length; j++) {
                        const mode = modes[j];

                        if (mode === action.payload.mode) {
                            state.value.modes[key] = action.payload.mode;
                        }
                    }
                }
            }
        },
    },
});

export const { setScheduleType, setScheduleMode } = scheduleTypeSlice.actions;

export default scheduleTypeSlice.reducer;
