import MainPage from "@/components/pages/main-page/MainPage.tsx";
import {useEffect} from "react";
import WeatherService from "@/service/WeatherService.ts";
import {useActionCreators, useAppSelector} from "@/hooks/redux.ts";
import {statisticActions} from "@/store/statisticSlice/slice.ts";

function App() {
    const reqData = useAppSelector(state => state.statistic.requestData);
    const weatherAction = useActionCreators(statisticActions);

    useEffect(() => {
        weatherAction.clearWeatherData();
        getWeatherStatistic();
    }, [reqData]);

    async function getWeatherStatistic() {
        try {
            const response = await WeatherService.getStatistic(reqData);
            weatherAction.setWeatherForecast(response.data.predicted);
            if (response.data.actual) weatherAction.setWeatherActualData(response.data.actual);
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <main className={"bg-light-bg dark:bg-dark-bg"}>
            <MainPage/>
        </main>
    )
}

export default App
