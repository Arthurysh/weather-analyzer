import {Bar, Line} from "react-chartjs-2";
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
    const weatherActualData = useAppSelector(state => state.statistic.weatherActualData);

    const reqData = useAppSelector(state => state.statistic.requestData);

    const weatherForecastEntries = weatherForecast && Object.entries(weatherForecast);
    const weatherActualDataEntries = weatherActualData && Object.entries(weatherActualData);

    return weatherForecast ? (
       <div className={"h-[30%] bg-main-white-color p-[20px] rounded-[10px] flex justify-center items-center text-center"}>
           {reqData.start_date === reqData.end_date ? (
               <Bar
                   data={{
                       labels: weatherForecastEntries?.map((data) => data[0]),
                       datasets: [
                           {
                               label: "Forecast",
                               data: weatherForecastEntries?.map((data) => data[1].temp),
                               backgroundColor: "#064FF0",
                               borderRadius: 5,
                           },
                           {
                               label: "Actual",
                               data: weatherActualDataEntries?.map((data) => data[1].temp),
                               backgroundColor: "#ea3746",
                               borderRadius: 5,
                           },
                       ],
                   }}
                   options={{
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
           ) : (
               <Line
                   data={{
                       labels: weatherForecastEntries?.map((data) => data[0]),
                       datasets: [
                           {
                               label: "Forecast",
                               data: weatherForecastEntries?.map((data) => data[1].temp),
                               backgroundColor: "#064FF0",
                               borderColor: "#064FF0",
                           },
                           {
                               label: "Actual",
                               data: weatherActualDataEntries?.map((data) => data[1].temp),
                               backgroundColor: "#ea3746",
                               borderColor: "#ea3746",
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
           )}
       </div>
    ) : (
        <Skeleton className={"h-[30%] rounded-[10px]"} />
    );
};

export default Temperature;