import { createSlice } from "@reduxjs/toolkit";
import removeDuplicateLines from "../lib/removeDuplicateTimeLines";

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
        setMinutes: (state, action) => {
            const lines = [];
            const maxLength = action.payload.length;

            for (let i = 0; i < maxLength; i++) {
                if (action.payload[i] == 60) continue;

                lines[i] = {
                    id: i + 1,
                    hours: "*",
                    minutes: action.payload[i] || "*",
                };
            }

            state.value = lines;
        },
        setHours: (state, action) => {
            let lines = [];
            let count = 0;

            for (let i = 0; i < action.payload.length; i++) {
                const localLines = [];

                for (let j = 0; j < state.value.length; j++) {
                    if (action.payload[i] == 24) continue;

                    count++;
                    localLines[j] = {
                        id: count,
                        hours: action.payload[i] || "*",
                        minutes: state.value[j].minutes || "*",
                    };
                }

                lines.push(...localLines);
            }

            state.value = removeDuplicateLines(lines);
        },
    },
});

export const {
    addTime,
    removeTime,
    setTime,
    setAllTimes,
    setMinutes,
    setHours,
} = timesListSlice.actions;

export default timesListSlice.reducer;
