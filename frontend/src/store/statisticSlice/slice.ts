import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {StatisticState} from "@/store/statisticSlice/type.ts";
import {WeatherForecast} from "@/models/WeatherForecast.ts";
import {DateRangeData} from "@/models/DateRangeData.ts";
import {MapCoordinate} from "@/models/MapCoordinate.ts";

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
        setWeatherForecast(state, action: PayloadAction<WeatherForecast>) {
            state.weatherForecast = action.payload;
        },
        clearWeatherForecast(state) {
            state.weatherForecast = null;
        },
        setDateRange(state, action: PayloadAction<DateRangeData>) {
            state.requestData.end_date = action.payload.end_date;
            state.requestData.start_date = action.payload.start_date;
        },
        setMapCoordinate(state, action: PayloadAction<MapCoordinate>) {
            state.requestData.latitude = action.payload.latitude;
            state.requestData.longitude = action.payload.longitude;
        }
    }
})

export const {reducer: statisticReducer, actions: statisticActions} = slice;