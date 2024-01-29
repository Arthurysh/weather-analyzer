import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {StatisticState} from "@/store/statisticSlice/type.ts";
import {WeatherForecast} from "@/models/WeatherForecast.ts";
import {DateRangeData} from "@/models/DateRangeData.ts";
import {MapCoordinate} from "@/models/MapCoordinate.ts";
import moment from "moment";

const initialState: StatisticState = {
    requestData: {
        latitude: 49.99,
        longitude: 36.23,
        start_date: moment().format("YYYY-MM-DD"),
        end_date: moment().format("YYYY-MM-DD")
    },
    weatherForecast: null,
    weatherActualData: null
}

const slice = createSlice({
    name: 'statistic',
    initialState,
    reducers: {
        setWeatherForecast(state, action: PayloadAction<WeatherForecast>) {
            state.weatherForecast = action.payload;
        },
        clearWeatherData(state) {
            state.weatherForecast = null;
            state.weatherActualData = null;
        },
        setWeatherActualData(state, action: PayloadAction<WeatherForecast>) {
            state.weatherActualData = action.payload;
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