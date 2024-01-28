import {Line} from "react-chartjs-2";
import {useAppSelector} from "@/hooks/redux.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";

const Wind = () => {
    const weatherForecast = useAppSelector(state => state.statistic.weatherForecast);
    const weatherForecastEntries = weatherForecast && Object.entries(weatherForecast);

    return weatherForecast ? (
        <div className={"bg-main-white-color rounded-[10px] w-[40%] p-[10px]"}>
            <Line
                data={{
                    labels: weatherForecastEntries?.map((data) => data[0]),
                    datasets: [
                        {
                            label: "Wind",
                            data: weatherForecastEntries?.map((data) => data[1].wind),
                            backgroundColor: "#064FF0",
                            borderColor: "#064FF0",
                        },
                    ],
                }}
                options={{
                    elements: {
                        line: {
                            tension: 0.5,
                        },
                    },
                    plugins: {
                        title: {
                            align: "center",
                            display: true,
                            text: "Wind",
                        },
                        legend: {
                            position: "bottom"
                        }
                    },
                }}
            />
        </div>
    ) : (
        <Skeleton className={"rounded-[10px] w-[40%]"} />
    );
};

export default Wind;