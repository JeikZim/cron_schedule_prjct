import { createSlice } from "@reduxjs/toolkit";

export const cronLineSlice = createSlice({
    name: "cronLine",
    initialState: {
        value: { lines: ["* * * * *"], linesCount: 1},
    },
    reducers: {
        changeMinutes: (state, action) => {
        },
        changeHours: (state, action) => {
        },
        changeDaysOfMonth: (state, action) => {
        },
        changeMonth: (state, action) => {
        },
        changeDaysOfWeek: (state, action) => {
        },
        setLine: (state, action) => {
            if (action.payload.lines.length === 0) {
                state.value = { lines: ["* * * * *"], linesCount: 1 }
                return
            }

            let cronExample = state.value.lines[0].replace(/ +/g, ' ').trim().split(' ');

            let lines = []
                
            for (let i = 0; i < action.payload.lines.length; i++) {
                const line = cronExample
                const lineObg = action.payload.lines[i];

                line[0] = lineObg.minutes || '*'    // Minutes
                line[1] = lineObg.hours || '*'      // Hours
                line[2] = lineObg.daysOfMonth || '*'// Day
                line[3] = lineObg.months || '*'      // Week
                line[4] = lineObg.daysOfWeek || '*' // Month
                
                lines.push(line.join(' '))
            }

            state.value = { lines, linesCount: lines.length }
        }
    },
});

export const { changeMinutes, changeHours, changeDayOfMonth, changeMonth, changeDayOfWeek, setLine } = cronLineSlice.actions;

export default cronLineSlice.reducer;
