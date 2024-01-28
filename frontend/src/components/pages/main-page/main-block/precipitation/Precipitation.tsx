import {Line} from "react-chartjs-2";
import {defaults} from "chart.js/auto";
import {useAppSelector} from "@/hooks/redux.ts";
import Spinner from "@/components/common/spinner/Spinner.tsx";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.color = "black";

const Precipitation = () => {
    const weatherForecast = useAppSelector(state => state.statistic.weatherForecast);
    const weatherForecastEntries = weatherForecast && Object.entries(weatherForecast);

    return (
       <div className={"h-[30%] bg-main-white-color p-[20px] rounded-[10px] flex justify-center items-center text-center"}>
           {weatherForecast ? (
               <Line
                   data={{
                       labels: weatherForecastEntries?.map((data) => data[0]),
                       datasets: [
                           {
                               label: "Precipitation",
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
                               text: "Precipitation",
                           },
                           legend: {
                               position: "bottom"
                           }
                       },
                   }}
               />
           ) : (
               <Spinner />
           )}
       </div>
    );
};

export default Precipitation;