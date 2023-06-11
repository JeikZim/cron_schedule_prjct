import { createSlice } from "@reduxjs/toolkit";

export const timesListSlice = createSlice({
    name: "timesList",
    initialState: {
        value: [{ id: 1, hours: "", minutes: "" }],
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
    },
});

export const { addTime, removeTime } = timesListSlice.actions;

export default timesListSlice.reducer;
