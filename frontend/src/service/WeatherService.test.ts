import {describe, expect, test} from "vitest";
import WeatherService from "@/service/WeatherService.ts";
import moment from "moment/moment";

describe("Weather api service", () => {
    test("should be 200", async () => {
        const data =  {
            latitude: 49.99,
            longitude: 36.23,
            start_date: moment().format("YYYY-MM-DD"),
            end_date: moment().format("YYYY-MM-DD"),
        }
        const response = await WeatherService.getStatistic(data);
        expect(response.status).toBe(200)
    });
    test("with empty start date", async () => {
        const data =  {
            latitude: 49.99,
            longitude: 36.23,
            start_date: "",
            end_date: moment().format("YYYY-MM-DD"),
        }
        try {
            await WeatherService.getStatistic(data);
        } catch (e) {
            expect(e.response.status).toBe(400);
        }
    });
    test("without end_date", async () => {
        const data =  {
            latitude: 49.99,
            longitude: 36.23,
            start_date: moment().format("YYYY-MM-DD"),
        }
        try {
            await WeatherService.getStatistic(data); 
        } catch (e) {
            expect(e.response.status).toBe(400);
        }
    });
    test("invalid latitude format", async () => {
        const data =  {
            latitude: "test",
            longitude: 36.23,
            start_date: moment().format("YYYY-MM-DD"),
            end_date: moment().format("YYYY-MM-DD"),
        }
        try {
            await WeatherService.getStatistic(data);
        } catch (e) {
            expect(e.response.status).toBe(400);
        }
    });
    test("start date greater than end date", async () => {
        const data =  {
            latitude: 36.23,
            longitude: 36.23,
            start_date: moment().add(1, "days").format("YYYY-MM-DD"),
            end_date: moment().format("YYYY-MM-DD"),
        }
        try {
            await WeatherService.getStatistic(data);
        } catch (e) {
            expect(e.response.status).toBe(400);
        }
    });
})