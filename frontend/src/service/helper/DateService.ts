import {DateRange} from "react-day-picker";
import {DateRangeData} from "@/models/DateRangeData.ts";

class DateService {
    static convertDateToString(dateRange: DateRange | undefined): DateRangeData | null {
        if (!dateRange?.from || !dateRange.to) return null;
        const {from, to} = dateRange;

        const fromYear = from.getFullYear();
        const fromMonth = from.getMonth() + 1;
        const fromDay = from.getDate();
        const newFromDate = fromYear + '-' + (fromMonth < 10 ? '0' : '') + fromMonth + '-' + (fromDay < 10 ? '0' : '') + fromDay;

        const toYear = to.getFullYear();
        const toMonth = to.getMonth() + 1;
        const toDay = to.getDate();
        const newToDate = toYear + '-' + (toMonth < 10 ? '0' : '') + toMonth + '-' + (toDay < 10 ? '0' : '') + toDay;

        return {start_date: newFromDate, end_date: newToDate};
    }
}

export default DateService