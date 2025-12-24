import { createSlice } from "@reduxjs/toolkit";

const problemSlice = createSlice({
    name: "problem",

    initialState: {
        data: {
            ProblemName: "",
            Description: "",
            Constraints: "",
            SampleCode: "",
            SampleInputs: [],
            SampleOutputs: [],
            TestCaseInputs: [],
            TestCaseOutputs: []
        },
        loading: false,
        error: null
    },

    reducers: {
        fetchProblemStart: (state) => {
            state.loading = true;
            state.error = null;

            // Optional: clear previous problem
            state.data = {
                ProblemName: "",
                Description: "",
                Constraints: "",
                SampleCode: "",
                SampleInputs: [],
                SampleOutputs: [],
                TestCaseInputs: [],
                TestCaseOutputs: []
            };
        },

        fetchProblemSuccess: (state, action) => {
            const p = action.payload;

            state.loading = false;
            state.error = null;

            // Map backend fields → our UI fields
            state.data = {
                ProblemName: p["Problem Name"] || "",
                Description: p["Description"] || "",
                Constraints: p["Constraints"] || "",
                SampleCode: p["SampleCode"] || "",
                SampleInputs: p["Sample Input"] || [],
                SampleOutputs: p["Sample Output"] || [],
                TestCaseInputs: p["Test Case Input"] || [],
                TestCaseOutputs: p["Test Case Output"] || []
            };
        },

        fetchProblemFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const {
    fetchProblemStart,
    fetchProblemSuccess,
    fetchProblemFailure
} = problemSlice.actions;

export default problemSlice.reducer;
