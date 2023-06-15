import { createSlice } from "@reduxjs/toolkit";

export const cronLocalLinesSlice = createSlice({
    name: "cronLocalLines",
    initialState: {
        value: ["* * * * *"],
        isValid: true,
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
        setValidityGlobal: (state, action) => {
            state.isValid = action.payload;
        },
    },
});

export const { setLocalLines, changeLine, setValidityGlobal } =
    cronLocalLinesSlice.actions;

export default cronLocalLinesSlice.reducer;
