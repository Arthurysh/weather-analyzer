import {Line} from "react-chartjs-2";
import {useAppSelector} from "@/hooks/redux.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";

const Precipitation = () => {
    const weatherForecast = useAppSelector(state => state.statistic.weatherForecast);
    const weatherForecastEntries = weatherForecast && Object.entries(weatherForecast);

    return weatherForecast ? (
        <div className={"h-full w-[60%] bg-main-white-color rounded-[10px] p-[10px]"}>
            <Line
                data={{
                    labels: weatherForecastEntries?.map((data) => data[0]),
                    datasets: [
                        {
                            label: "Precipitation",
                            data: weatherForecastEntries?.map((data) => data[1].precip),
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
        </div>
    ) : (
        <Skeleton className={"h-full w-[60%] p-[10px]"} />
    );
};

export default Precipitation;