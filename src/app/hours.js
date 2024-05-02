import { createSlice } from "@reduxjs/toolkit";

export const hoursSlice = createSlice({
    name: "hours",
    initialState: {
        value: [{ id: 1, hours: "00" }],
    },
    reducers: {
        addHours: (state, action) => {
            const hours = Number(action.payload.hours)

            if (hours < 24 && hours >= 0) {
                state.value.push({ id: action.payload.id, hours: String(hours) });
            }
        },
        removeHours: (state, action) => {
            state.value = state.value
                .filter((el) => el.id !== action.payload.id)
                .map((el, index) => {
                    return { ...el, id: 1 + index };
                });
        },
        updateHours: (state, action) => {
            let hours = action.payload.hours

            if (hours < 24 && hours >= 0) {
                const index = state.value.findIndex((el) => el.id == action.payload.id)
                
                state.value[index].hours = hours
            }
        }
    },
});

export const {
    addHours,
    removeHours,
    updateHours
} = hoursSlice.actions;

export default hoursSlice.reducer;
