import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import countryReducer from "./countrySlice";

export const store = configureStore({
    reducer: {
        login: loginReducer,
        country: countryReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = typeof store.dispatch;