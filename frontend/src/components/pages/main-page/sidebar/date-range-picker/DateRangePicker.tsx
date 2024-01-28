import {format} from "date-fns"
import {Calendar as CalendarIcon} from "lucide-react"
import {DateRange} from "react-day-picker"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import {useActionCreatorsTyped, useAppSelector} from "@/hooks/redux.ts";
import DateService from "@/service/helper/DateService.ts";
import {statisticActions} from "@/store/statisticSlice/slice.ts";
import {motion} from "framer-motion"
import {useEffect, useState} from "react";

function DateRangePicker() {
    const weatherForecast = useAppSelector(state => state.statistic.weatherForecast);

    const from = useAppSelector((state) => state.statistic.requestData.start_date);
    const to = useAppSelector((state) => state.statistic.requestData.end_date);

    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(from),
        to: new Date(to),
    })

    useEffect(() => {
        datePickerHandler(date);
    }, [date]);

    const dateAction = useActionCreatorsTyped(statisticActions);

    const datePickerAnimation = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: {delay: 0.2, duration: 0.8, linear: [0.67, 0.67, 0.67, 0.67]}
        }
    }

    const datePickerHandler = (dateRange: DateRange | undefined) => {
        const convertedDateRange = DateService.convertDateToString(dateRange);
        if (!convertedDateRange) return;
        dateAction.setDateRange(convertedDateRange)
    }

    return (
        <motion.div
            variants={datePickerAnimation}
            className={cn("grid gap-2 w-full mb-3")}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[300px] justify-center text-left font-normal mx-auto",
                            !date && "text-muted-foreground"
                        )}
                        disabled={!weatherForecast}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4"/>
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
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
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </motion.div>
    )
}

export default DateRangePicker;