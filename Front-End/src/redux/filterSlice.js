import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    from: "",
    to: "",
    difficulties: [],
    mistakesMade: [],
    timeTaken: "",
    sort: "completedAt",
    order: -1,
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setFrom: (state, action) => {
            state.from = action.payload;
        },
        setTo: (state, action) => {
            state.to = action.payload;
        },
        setDifficulties: (state, action) => {
            const difficulty = action.payload;

            if (state.difficulties.includes(difficulty)) {
                const filtered = state.difficulties.filter(
                    (difficultyLevel) => difficultyLevel !== difficulty
                );
                state.difficulties = filtered;
                return;
            }

            state.difficulties = [...state.difficulties, difficulty];
        },
        setMistakesMade: (state, action) => {
            const mistakes = action.payload;

            if (state.mistakesMade.includes(mistakes)) {
                const filtered = state.mistakesMade.filter(
                    (mistakeCount) => mistakeCount !== mistakes
                );
                state.mistakesMade = filtered;
                return;
            }

            state.mistakesMade = [...state.mistakesMade, mistakes];
        },
        setTimeTaken: (state, action) => {
            state.timeTaken = action.payload;
        },
        setSort: (state, action) => {
            state.sort = action.payload;
        },
        setOrder: (state, action) => {
            state.order = action.payload;
        },
        resetFilters: (state) => {
            state.from = "";
            state.to = "";
            state.difficulties = [];
            state.mistakesMade = [];
            state.timeTaken = "";
            state.sort = "completedAt";
            state.order = -1;
        },
    },
});

export const {
    setFrom,
    setTo,
    setDifficulties,
    setMistakesMade,
    setTimeTaken,
    setSort,
    setOrder,
    resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
