import Header from "@/components/pages/main-page/main-block/header/Header.tsx";
import Wind from "@/components/pages/main-page/main-block/wind/Wind.tsx";
import MapLocation from "@/components/pages/main-page/main-block/map/Map.tsx";
import Temperature from "@/components/pages/main-page/main-block/temperature/Temperature.tsx";
import Precipitation from "@/components/pages/main-page/main-block/precipitation/Precipitation.tsx";

function MainBlock() {
    return (
        <div className={"w-9/12 h-full p-[25px] flex flex-col gap-[15px]"}>
            <Header />
            <MapLocation />
            <Temperature />
            <div className={"h-[30%] flex justify-between gap-[15px]"}>
                <Precipitation />
                <Wind />
            </div>
        </div>
    )
}

export default MainBlock;