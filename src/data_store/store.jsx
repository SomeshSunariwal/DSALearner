import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import problemReducer from "./problem_store";
import problemListReducer from "./problemList_store";

import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        problem: problemReducer,
        problemList: problemListReducer,
    },
    middleware: (getDefault) => getDefault().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);