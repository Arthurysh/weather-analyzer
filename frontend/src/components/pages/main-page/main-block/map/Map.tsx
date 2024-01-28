import Map from 'react-map-gl';
import GeocoderControl from "@/components/pages/main-page/main-block/map/GeocoderControl.tsx";
import {useAppSelector} from "@/hooks/redux.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";

const TOKEN = import.meta.env.VITE_MAPBOX_GL_API;

const MapLocation = () => {
    const weatherForecast = useAppSelector(state => state.statistic.weatherForecast);
    const reqData = useAppSelector(state => state.statistic.requestData);

    return weatherForecast ? (
        <div className={"h-[30%]"}>
            <Map
                initialViewState={{
                    longitude: reqData.longitude,
                    latitude: reqData.latitude,
                    zoom: 13
                }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={TOKEN}
            >
                <GeocoderControl mapboxAccessToken={TOKEN} position="top-left" />
            </Map>
        </div>
    ) : (
        <Skeleton className={"h-[30%]"} />
    );
};

export default MapLocation;