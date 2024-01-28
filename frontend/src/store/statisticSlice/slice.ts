import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {StatisticState} from "@/store/statisticSlice/type.ts";
import {WeatherRequestParameters} from "@/models/WeatherRequestParameters.ts";
import {WeatherForecast} from "@/models/WeatherForecast.ts";

const initialState: StatisticState = {
    requestData: {
        latitude: 52.52,
        longitude: 13.41,
        start_date: "2023-01-01",
        end_date: "2023-01-31"
    },
    weatherForecast: null
}

const slice = createSlice({
    name: 'statistic',
    initialState,
    reducers: {
        setRequestData(state, action: PayloadAction<WeatherRequestParameters>) {
            state.requestData = action.payload;
        },
        setWeatherForecast(state, action: PayloadAction<WeatherForecast>) {
            state.weatherForecast = action.payload;
        }
    }
})

export const {reducer: statisticReducer, actions: statisticActions} = slice;