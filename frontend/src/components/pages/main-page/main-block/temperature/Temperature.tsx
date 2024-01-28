import {Line} from "react-chartjs-2";
import {defaults} from "chart.js/auto";
import {useAppSelector} from "@/hooks/redux.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.color = "black";

const Temperature = () => {
    const weatherForecast = useAppSelector(state => state.statistic.weatherForecast);
    const weatherForecastEntries = weatherForecast && Object.entries(weatherForecast);

    return weatherForecast ? (
       <div className={"h-[30%] bg-main-white-color p-[20px] rounded-[10px] flex justify-center items-center text-center"}>
               <Line
                   data={{
                       labels: weatherForecastEntries?.map((data) => data[0]),
                       datasets: [
                           {
                               label: "Temperature",
                               data: weatherForecastEntries?.map((data) => data[1].temp),
                               backgroundColor: "#064FF0",
                               borderColor: "#064FF0",
                           },
                       ],
                   }}
                   options={{
                       responsive: true,
                       elements: {
                           line: {
                               tension: 0.5,
                           },
                       },
                       plugins: {
                           title: {
                               align: "center",
                               display: true,
                               text: "Temperature",
                           },
                           legend: {
                               position: "bottom"
                           }
                       },
                   }}
               />
       </div>
    ) : (
        <Skeleton className={"h-[30%] rounded-[10px]"} />
    );
};

export default Temperature;