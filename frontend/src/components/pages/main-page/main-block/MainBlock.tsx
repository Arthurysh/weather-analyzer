import Header from "@/components/pages/main-page/main-block/header/Header.tsx";
import Precipitation from "@/components/pages/main-page/main-block/precipitation/Precipitation.tsx";
import Temperature from "@/components/pages/main-page/main-block/temperature/Temperature.tsx";
import Wind from "@/components/pages/main-page/main-block/wind/Wind.tsx";
import MapLocation from "@/components/pages/main-page/main-block/map/Map.tsx";

function MainBlock() {
    return (
        <div className={"w-9/12 h-full p-[25px] flex flex-col gap-[15px]"}>
            <Header />
            <MapLocation />
            <Precipitation />
            <div className={"flex"}>
                <Temperature />
                <Wind />
            </div>
        </div>
    )
}

export default MainBlock;