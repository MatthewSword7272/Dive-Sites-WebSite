import React from "react";
import {GoogleMap, InfoWindow, Marker, useLoadScript} from '@react-google-maps/api';
import MapStyle from "./MapStyle";

const libraries = ["places"];
const mapContainerStyle = {
    height: "55vh",
    width: "50em",
    border: '#a3a3a3 3px solid',
}

const center = {
    lat: -38.425521,
    lng: 144.743174
}
const options = {
    styles: MapStyle,
    streetViewControl: false,
    mapTypeId: 'satellite',
    scaleControl: true
}

export default function Map(props) {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    const [selected, setSelected] = React.useState(null);

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, [])

    if (loadError) return (<p>Error loading maps</p>);
    if (!isLoaded) return (<p>Loading Maps</p>);

    return (
        <div className="map">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={7}
                center={center}
                options={options}
                onLoad={onMapLoad}
            >
                {props.sites.map((marker, index) => {
                    return (
                        <Marker
                            key={index}
                            position={{lat: marker.latitude, lng: marker.longitude}}
                            onClick={() => {setSelected(marker)}}
                        />
                    );
                })}
                {selected ? (
                    <InfoWindow
                        position={{lat: selected.latitude, lng: selected.longitude}}
                        onCloseClick={() => {setSelected(null)}}
                    >
                        <div>
                            <h4>{selected.name}</h4>
                            <section className="info-window">
                                Depth: {selected.min_depth}m to {selected.max_depth}m<br/>
                                Latitude: {selected.latitude.toFixed(5)}<br/>
                                Longitude: {selected.longitude.toFixed(5)}<br/>
                                {selected.features.join(',')}
                            </section>
                        </div>
                    </InfoWindow>
                ) : null}
            </GoogleMap>
        </div>
    );
}