import Map from 'react-map-gl';
import GeocoderControl from "@/components/pages/main-page/main-block/map/GeocoderControl.tsx";
import {useAppSelector} from "@/hooks/redux.ts";
import {useEffect} from "react";
import { motion } from "framer-motion"

const TOKEN = import.meta.env.VITE_MAPBOX_GL_API;

const MapLocation = () => {
    const weatherForecast = useAppSelector(state => state.statistic.weatherForecast);
    const reqData = useAppSelector(state => state.statistic.requestData);

    const searchInput = document.querySelector(".mapboxgl-ctrl-top-left") as HTMLDivElement;

    const mapBlockAnimation = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: {delay: 0.4, duration: 0.8, linear: [0.67, 0.67, 0.67, 0.67]}
        }
    }

    useEffect(() => {
        if (!searchInput) return;
        searchInput.style.translate = weatherForecast ? "0" : "-150%";
    });

    return (
        <motion.div
            variants={mapBlockAnimation}
            className={"h-[30%]"}>
            <Map
                initialViewState={{
                    longitude: reqData.longitude,
                    latitude: reqData.latitude,
                    zoom: 13
                }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={TOKEN}
            >
                <GeocoderControl mapboxAccessToken={TOKEN} position="top-left"/>
            </Map>
        </motion.div>
    )
};

export default MapLocation;