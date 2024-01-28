import DateRangePicker from "@/components/pages/main-page/sidebar/date-range-picker/DateRangePicker.tsx";
import WeatherList from "@/components/pages/main-page/sidebar/weather-list/WeatherList.tsx";

function Sidebar() {
    return (
        <div className={"w-3/12 h-full bg-sidebar flex flex-col items-center py-4 pl-8 pr-5 relative"}>
            <h3 className={"text-main-white-color text-[25px] font-semibold mb-4"}>Weather Forecast</h3>
            <DateRangePicker />
            <WeatherList />
        </div>
    )
}

export default Sidebar;