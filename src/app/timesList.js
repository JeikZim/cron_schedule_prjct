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
        setMinutes: (state, action) => {
            const lines = [];
            const maxLength =
                action.payload.length > state.value.length
                    ? action.payload.length
                    : state.value.length;

            for (let i = 0; i < maxLength; i++) {
                if (!action.payload[i] && !state.value[i]) {
                    break;
                }

                if (
                    state.value[i] && lines[i - 1] &&
                    (state.value[i].minutes === lines[i - 1].minutes) &&
                    (state.value[i].hours === lines[i - 1].hours)
                ) {
                    break;
                }

                lines[i] = {
                    id: i + 1,
                    hours:
                        state.value[i] && state.value[i].hours
                            ? state.value[i].hours
                            : state.value[state.value.length - 1].hours || "*",
                    minutes:
                        action.payload[i] ||
                        action.payload[action.payload.length - 1] ||
                        "*",
                };
            }

            console.log(lines);
            state.value = lines;
        },
        setHours: (state, action) => {
            // const originalLines = state.value;
            const lines = [];
            const maxLength =
                action.payload.length > state.value.length
                    ? action.payload.length
                    : state.value.length;

            for (let i = 0; i < maxLength; i++) {
                if (!action.payload[i] && !state.value[i]) {
                    break;
                }

                if (
                    state.value[i] && lines[i - 1] &&
                    (state.value[i].minutes === lines[i - 1].minutes) &&
                    (state.value[i].hours === lines[i - 1].hours)
                ) {
                    break;
                }

                lines[i] = {
                    id: i + 1,
                    hours:
                        action.payload[i] ||
                        action.payload[action.payload.length - 1] ||
                        "*",
                    minutes:
                        state.value[i] && state.value[i].minutes
                            ? state.value[i].minutes
                            : state.value[state.value.length - 1].minutes ||
                              "*",
                };
            }

            // originalLines.push(...lines);
            state.value = lines;
            // state.value = originalLines;
        },
        setAllTimes: (state, action) => {
            // const lines = action.payload.lines;
            // for (let i = 0; i < lines.length; i++) {
            //     const line = lines[i].split(' ');
            //     const minutes = line[0];
            //     const hours = line[1];
            // }
            // state.value[id - 1].hours = hours;
            // state.value[id - 1].minutes = minutes;
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
