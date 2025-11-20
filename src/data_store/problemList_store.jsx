import { createSlice } from "@reduxjs/toolkit";

const problemListSlice = createSlice({
    name: "problemList",

    initialState: {
        loading: false,
        error: null,
        data: [],   // full metadata (Easy → categories → problems)
    },

    reducers: {

        // Start fetching
        fetchProblemListStart: (state) => {
            state.loading = true;
            state.error = null;
        },

        // Success
        fetchProblemListSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },

        // Failure
        fetchProblemListFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchProblemListStart,
    fetchProblemListSuccess,
    fetchProblemListFailure
} = problemListSlice.actions;

export default problemListSlice.reducer;
