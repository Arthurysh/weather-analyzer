import {useEffect, useState} from 'react';
import {useControl, Marker, MarkerProps, ControlPosition} from 'react-map-gl';
import MapboxGeocoder, {GeocoderOptions} from '@mapbox/mapbox-gl-geocoder';
import {useActionCreatorsTyped, useAppSelector} from "@/hooks/redux.ts";
import {statisticActions} from "@/store/statisticSlice/slice.ts";

type GeocoderControlProps = Omit<GeocoderOptions, 'accessToken' | 'mapboxgl' | 'marker'> & {
    mapboxAccessToken: string;
    marker?: boolean | Omit<MarkerProps, 'longitude' | 'latitude'>;

    position: ControlPosition;

    onLoading?: (e: object) => void;
    onResults?: (e: object) => void;
    onResult?: (e: object) => void;
    onError?: (e: object) => void;
};

/* eslint-disable complexity,max-statements */
export default function GeocoderControl(props: GeocoderControlProps) {

    const navAction = useActionCreatorsTyped(statisticActions);
    const reqData = useAppSelector(state => state.statistic.requestData);
    
    const [marker, setMarker] = useState<JSX.Element>(null);

    console.log(marker)

    useEffect(() => {
        if (!marker || !marker.props) return;

        navAction.setMapCoordinate(marker.props);
    }, [marker]);

    useEffect(() => {
        const defaultMarker = <Marker longitude={reqData.longitude} latitude={reqData.latitude} />;
        setMarker(defaultMarker);
    }, []);

    const geocoder = useControl<MapboxGeocoder>(
        () => {
            const ctrl = new MapboxGeocoder({
                ...props,
                marker: false,
                accessToken: props.mapboxAccessToken
            });
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            ctrl.on('loading', props.onLoading);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            ctrl.on('results', props.onResults);
            ctrl.on('result', evt => {
                // @ts-ignore
                props.onResult(evt);

                const {result} = evt;
                const location =
                    result &&
                    (result.center || (result.geometry?.type === 'Point' && result.geometry.coordinates));
                if (location && props.marker) {
                    // @ts-ignore
                    setMarker(<Marker {...props.marker} longitude={location[0]} latitude={location[1]} />);
                } else {
                    setMarker(null);
                }
            });
            // @ts-ignore
            ctrl.on('error', props.onError);
            return ctrl;
        },
        {
            position: props.position
        }
    );

    // @ts-ignore
    if (geocoder._map) {
        if (geocoder.getProximity() !== props.proximity && props.proximity !== undefined) {
            geocoder.setProximity(props.proximity);
        }
        if (geocoder.getRenderFunction() !== props.render && props.render !== undefined) {
            geocoder.setRenderFunction(props.render);
        }
        if (geocoder.getLanguage() !== props.language && props.language !== undefined) {
            geocoder.setLanguage(props.language);
        }
        if (geocoder.getZoom() !== props.zoom && props.zoom !== undefined) {
            geocoder.setZoom(props.zoom);
        }
        if (geocoder.getFlyTo() !== props.flyTo && props.flyTo !== undefined) {
            geocoder.setFlyTo(props.flyTo);
        }
        if (geocoder.getPlaceholder() !== props.placeholder && props.placeholder !== undefined) {
            geocoder.setPlaceholder(props.placeholder);
        }
        if (geocoder.getCountries() !== props.countries && props.countries !== undefined) {
            geocoder.setCountries(props.countries);
        }
        if (geocoder.getTypes() !== props.types && props.types !== undefined) {
            geocoder.setTypes(props.types);
        }
        if (geocoder.getMinLength() !== props.minLength && props.minLength !== undefined) {
            geocoder.setMinLength(props.minLength);
        }
        if (geocoder.getLimit() !== props.limit && props.limit !== undefined) {
            geocoder.setLimit(props.limit);
        }
        if (geocoder.getFilter() !== props.filter && props.filter !== undefined) {
            geocoder.setFilter(props.filter);
        }
        if (geocoder.getOrigin() !== props.origin && props.origin !== undefined) {
            geocoder.setOrigin(props.origin);
        }
    }
    return marker;
}

const noop = () => {};

GeocoderControl.defaultProps = {
    marker: true,
    onLoading: noop,
    onResults: noop,
    onResult: noop,
    onError: noop
};