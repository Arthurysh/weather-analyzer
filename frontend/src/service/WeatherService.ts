import $api from "@/http";
import {WeatherRequestParameters} from "@/models/WeatherRequestParameters.ts";

export default class WeatherService {
    static headers = {
        'Content-Type': 'application/json'
    };

    static async getStatistic({latitude, longitude, start_date, end_date}: WeatherRequestParameters) {
        const options = {
            headers: this.headers,
        };

        return await $api.get(`api/data/?latitude=${latitude}&longitude=${longitude}&start_date=${start_date}&end_date=${end_date}`, options);
    }
}