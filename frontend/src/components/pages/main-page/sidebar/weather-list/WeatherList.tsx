import {useAppSelector} from "@/hooks/redux.ts";
import moment from "moment";
import Spinner from "@/components/common/spinner/Spinner.tsx";

function WeatherList() {
    const weatherForecast = useAppSelector(state => state.statistic.weatherForecast);
    const weatherForecastEntries = weatherForecast && Object.entries(weatherForecast);

    return (
        <div className={"w-full overflow-y-scroll"}>
            {weatherForecastEntries ? weatherForecastEntries.map((item, index) => (
                <div key={index} className={"py-4 text-main-white-color flex justify-between border-b border-color-border last:border-transparent"}>
                    <div className={"text-[18px]"}>{moment(item[0]).format('dddd, MMMM D')}</div>
                    <div className={"text-[20px] flex"}>
                        <div className={"h-[90%] w-[2px] bg-main-white-color flex-shrink-0"}/>
                        <span className={"w-[100px] text-right"}>{item[1].temp}° C</span>
                    </div>
                </div>
            )) : <Spinner />}
        </div>
    )
}

export default WeatherList;