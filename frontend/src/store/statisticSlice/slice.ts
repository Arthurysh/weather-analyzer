import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {StatisticState} from "@/store/statisticSlice/type.ts";
import {WeatherRequestParameters} from "@/models/WeatherRequestParameters.ts";

const initialState: StatisticState = {
    requestData: null,
    weatherForecast: null
}

const slice = createSlice({
    name: 'statistic',
    initialState,
    reducers: {
        setRequestData(state, action: PayloadAction<WeatherRequestParameters>) {
            state.requestData = action.payload;
        }
    }
})

export const {reducer: statisticReducer, actions: statisticActions} = slice;