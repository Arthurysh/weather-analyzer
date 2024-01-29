import {describe, expect, it} from "vitest";
import DateService from "@/service/helper/DateService.ts";

describe("DataService test", () => {
    it("convert data to string", () => {
        expect(DateService.convertDateToString({
            from: new Date("2024-05-29"),
            to: new Date("2024-01-29")
        })).toEqual({
            end_date: "2024-01-29",
            start_date: "2024-05-29"
        })
    });
    it("convert undefiend", () => {
        expect(DateService.convertDateToString(undefined)).toBe(null)
    })
})