import { createSlice } from "@reduxjs/toolkit";

export const cronLocalLinesSlice = createSlice({
    name: "cronLocalLines",
    initialState: {
        value: ["* * * * *"],
    },
    reducers: {
        changeLine: (state, action) => {
            let tmp = state.value;
            tmp[action.payload.index] = action.payload.line;
            state.value = tmp;
        },
        setLocalLines: (state, action) => {
            let tmp = state.value;
            tmp[action.payload.index] = action.payload.line;
            state.value = tmp;
        },
    },
});

export const { setLocalLines, changeLine } = cronLocalLinesSlice.actions;

export default cronLocalLinesSlice.reducer;
