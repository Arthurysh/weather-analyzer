import Map, {Marker} from 'react-map-gl';
import GeocoderControl from "@/components/pages/main-page/main-block/map/GeocoderControl.tsx";
import {useAppSelector} from "@/hooks/redux.ts";
import {useEffect, useState} from "react";

const TOKEN = import.meta.env.VITE_MAPBOX_GL_API;

const MapLocation = () => {
    const reqData = useAppSelector(state => state.statistic.requestData);

    return (
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
    );
};

export default MapLocation;