import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import countryReducer from "./countrySlice";
import seasonReducer from "./seasonSlice";
import leagueReducer from "./leagueSlice";
import teamReducer from "./teamSlice";

export const store = configureStore({
    reducer: {
        login: loginReducer,
        country: countryReducer,
        season: seasonReducer,
        league: leagueReducer,
        team: teamReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = typeof store.dispatch;