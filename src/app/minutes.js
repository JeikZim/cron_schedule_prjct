import { createSlice } from "@reduxjs/toolkit";

export const minutesSlice = createSlice({
    name: "minutes",
    initialState: {
        value: [{ id: 1, minutes: "00" }],
    },
    reducers: {
        addHours: (state, action) => {
            const minutes = Number(action.payload.minutes)

            if (minutes < 60 && minutes >= 0)
            state.value.push({ id: action.payload.id, minutes: String(minutes) });
        },
        removeHours: (state, action) => {
            state.value = state.value
                .filter((el) => el.id !== action.payload.id)
                .map((el, index) => {
                    return { ...el, id: 1 + index };
                });
        },
    },
});

export const {
    addMinutes,
    removeMinutes
} = minutesSlice.actions;

export default minutesSlice.reducer;
