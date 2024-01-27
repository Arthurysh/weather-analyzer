import {WeatherRequestParameters} from "@/models/WeatherRequestParameters.ts";
import {WeatherForecast} from "@/models/WeatherForecast.ts";

export interface StatisticState {
    requestData: WeatherRequestParameters | null;
    weatherForecast: WeatherForecast | null;
}