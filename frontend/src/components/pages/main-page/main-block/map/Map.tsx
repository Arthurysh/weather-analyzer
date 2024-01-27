import Map from 'react-map-gl';
import GeocoderControl from "@/components/pages/main-page/main-block/map/GeocoderControl.tsx";

const TOKEN = import.meta.env.VITE_MAPBOX_GL_API;

const MapLocation = () => {
    return (
        <div className={"h-[30%]"}>
            <Map
                initialViewState={{
                    longitude: -79.4512,
                    latitude: 43.6568,
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