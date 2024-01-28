interface WeatherData {
    temp: number;
    precip: number;
    wind: number;
}

export interface WeatherForecast {
    [date: string]: WeatherData;
}