import { createSlice } from "@reduxjs/toolkit";

const problemSlice = createSlice({
    name: "problem",
    initialState: {
        ProblemName: "",
        Description: "",
        Constraints: "",
        SampleInputs: [],
        SampleOutputs: [],
        TestCaseInputs: [],
        TestCaseOutputs: [],
        TestCaseActualOutputs: []
    },

    reducers: {
        setProblem: (state, action) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { setProblem } = problemSlice.actions;
export default problemSlice.reducer;