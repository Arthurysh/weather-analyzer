import {format} from "date-fns"
import {Calendar as CalendarIcon} from "lucide-react"
import {DateRange} from "react-day-picker"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {useActionCreatorsTyped, useAppSelector} from "@/hooks/redux.ts";
import DateService from "@/service/helper/DateService.ts";
import {statisticActions} from "@/store/statisticSlice/slice.ts";

function DateRangePicker() {

    const from = useAppSelector((state) => state.statistic.requestData.start_date);
    const to = useAppSelector((state) => state.statistic.requestData.end_date);
    const weatherForecast = useAppSelector(state => state.statistic.weatherForecast);

    const dateAction = useActionCreatorsTyped(statisticActions);

    const datePickerHandler = (dateRange: DateRange | undefined) => {
        const convertedDateRange = DateService.convertDateToString(dateRange);
        if (!convertedDateRange) return;
        dateAction.setDateRange(convertedDateRange)
    }

    return (
        <div className={"grid gap-2 w-full mb-3"}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        className={cn(
                            "w-[300px] justify-center text-left font-normal mx-auto",
                            (!from || !to) && "text-muted-foreground", !weatherForecast && "cursor-not-allowed"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4"/>
                        {from ? (
                            to ? (
                                <>
                                    {format(from, "LLL dd, y")} -{" "}
                                    {format(to, "LLL dd, y")}
                                </>
                            ) : (
                                format(from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={new Date(from)}
                        selected={{from: new Date(from), to: new Date(to)}}
                        onSelect={datePickerHandler}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default DateRangePicker;