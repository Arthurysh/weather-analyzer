import $api from "@/http";

export default class WeatherService {
    static headers = {
        'Content-Type': 'application/json'
    };

    static async getStatistic() {
        const options = {
            headers: this.headers,
        };

        return await $api.get(`api/data/?latitude=52.52&longitude=13.41&start_date=2023-01-01&end_date=2023-01-31`, options);
    }
}