import { createSlice } from "@reduxjs/toolkit";

export const cronLinesSlice = createSlice({
    name: "cronLines",
    initialState: {
        value: {
            lines: [
                {
                    minutes: "*",
                    hours: "*",
                    daysOfMonth: "*",
                    months: "*",
                    daysOfWeek: "*",
                },
            ],
            linesCount: 1,
        },
    },
    reducers: {
        // changeMinutes: (state, action) => {
        // },
        // changeHours: (state, action) => {
        // },
        // changeDaysOfMonth: (state, action) => {
        // },
        // changeMonth: (state, action) => {
        // },
        // changeDaysOfWeek: (state, action) => {
        // },
        setLines: (state, action) => {
            if (action.payload.lines.length === 0) {
                state.value = { lines: ["* * * * *"], linesCount: 1 };
                return;
            }
            // let cronExample = state.value.lines[0].replace(/ +/g, ' ').trim().split(' ');

            let lines = [];
            for (let i = 0; i < action.payload.lines.length; i++) {
                const lineObg = action.payload.lines[i];
                const line = {
                    minutes: "*",
                    hours: "*",
                    daysOfMonth: "*",
                    months: "*",
                    daysOfWeek: "*",
                };

                line.minutes = lineObg.minutes || "*";
                line.hours = lineObg.hours || "*";
                line.daysOfMonth = lineObg.daysOfMonth || "*";
                line.months = lineObg.months || "*";
                line.daysOfWeek = lineObg.daysOfWeek || "*";

                lines.push(line);
            }

            state.value = { lines, linesCount: lines.length };
        },
    },
});

export const { setLines } = cronLinesSlice.actions;

export default cronLinesSlice.reducer;
