import {Bar, Line} from "react-chartjs-2";
import {useAppSelector} from "@/hooks/redux.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";

const Precipitation = () => {
    const weatherForecast = useAppSelector(state => state.statistic.weatherForecast);
    const weatherActualData = useAppSelector(state => state.statistic.weatherActualData);

    const reqData = useAppSelector(state => state.statistic.requestData);

    const weatherForecastEntries = weatherForecast && Object.entries(weatherForecast);
    const weatherActualDataEntries = weatherActualData && Object.entries(weatherActualData);

    return weatherForecast ? (
        <div className={"h-full w-[60%] bg-main-white-color rounded-[10px] p-[10px]"}>
            {reqData.start_date === reqData.end_date ? (
                <Bar
                    data={{
                        labels: weatherForecastEntries?.map((data) => data[0]),
                        datasets: [
                            {
                                label: "Forecast",
                                data: weatherForecastEntries?.map((data) => data[1].precip),
                                backgroundColor: "#064FF0",
                                borderRadius: 5,
                            },
                            {
                                label: "Actual",
                                data: weatherActualDataEntries?.map((data) => data[1].precip),
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
                                text: "Precipitation",
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
                                data: weatherForecastEntries?.map((data) => data[1].precip),
                                backgroundColor: "#064FF0",
                                borderColor: "#064FF0",
                            },
                            {
                                label: "Actual",
                                data: weatherActualDataEntries?.map((data) => data[1].precip),
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
                                text: "Precipitation",
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
        <Skeleton className={"h-full w-[60%] p-[10px]"} />
    );
};

export default Precipitation;