import { createSlice } from "@reduxjs/toolkit";

export const timesListSlice = createSlice({
    name: "timesList",
    initialState: {
        value: [{ id: 1, hours: "00", minutes: "00" }],
    },
    reducers: {
        addTime: (state, action) => {
            state.value.push(action.payload);
        },
        removeTime: (state, action) => {
            state.value = state.value
                .filter((el) => el.id !== action.payload.id)
                .map((el, index) => {
                    return { ...el, id: 1 + index };
                });
        },
        setTime: (state, action) => {
            const id = action.payload.id;
            const hours = action.payload.hours;
            const minutes = action.payload.minutes;

            state.value[id - 1].hours = hours;
            state.value[id - 1].minutes = minutes;
        },
    },
});

export const { addTime, removeTime, setTime } = timesListSlice.actions;

export default timesListSlice.reducer;
