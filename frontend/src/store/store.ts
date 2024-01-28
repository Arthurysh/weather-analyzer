import {configureStore} from "@reduxjs/toolkit";

import {statisticReducer} from "./statisticSlice/slice";

export const store = configureStore({
    reducer: {
        statistic: statisticReducer,
    }
})

export * from "./statisticSlice/slice";
export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;