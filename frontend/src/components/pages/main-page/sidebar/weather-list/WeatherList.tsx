import {useAppSelector} from "@/hooks/redux.ts";
import moment from "moment";
import Spinner from "@/components/common/spinner/Spinner.tsx";
import cloudImage from "@/assets/images/cloud.svg"
import { motion } from "framer-motion"
import {ScrollArea} from "@/components/ui/scroll-area.tsx";

function WeatherList() {
    const weatherForecast = useAppSelector(state => state.statistic.weatherForecast);
    const weatherForecastEntries = weatherForecast && Object.entries(weatherForecast);

    const forecastXAnimation = {
        hidden: {
            x: 100,
            opacity: 0
        },
        visible: (custom: number) => ({
            x: 0,
            opacity: 1,
            transition: {delay: custom * 0.2, duration: 0.8, linear: [0.67, 0.67, 0.67, 0.67]}
        })
    }

    return (
        <ScrollArea className={"w-full h-full pr-5 overflow-x-hidden"}>
            {weatherForecastEntries ? weatherForecastEntries.map((item, index) => (
                <motion.div
                    custom={index}
                    variants={forecastXAnimation}
                    key={index} className={"py-4 text-main-white-color flex justify-between border-b border-color-border last:border-transparent"}>
                    <div className={"text-[18px] flex items-center gap-[15px]"}>
                        <img src={cloudImage} alt="cloud image" className={"max-h-[40px] max-w-[40px]"}/>
                        {moment(item[0]).format('dddd, MMMM D')}
                    </div>
                    <div className={"text-[20px] flex"}>
                        <div className={"h-[90%] w-[2px] bg-main-white-color flex-shrink-0"}/>
                        <span className={"w-[100px] text-right"}>{item[1].temp}° C</span>
                    </div>
                </motion.div>
            )) : <Spinner className={"absolute top-[50%] left-[50%] transform-[translate(-50%, -50%)] mr-[-50%]"} />}
        </ScrollArea>
    )
}

export default WeatherList;