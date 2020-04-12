import React from 'react';
import GoogleMapReact from "google-map-react";
import {LocationOn} from "@material-ui/icons";

const Marker = () => <LocationOn style={{color: "#bd4949"}}/>;

const google = window.google;

const MapComponent = (props) => {

    const Marker = () => <LocationOn
        style={{color: "#bd4949", textAlign: "center", transform: "translate(-50%, -50%)", position: "absolute"}}/>;

    const marker = props.position ? <Marker lat={props.position.lat} lng={props.position.lng}/> : "";


    const defaultMarker = !props.position && !(props.hotspots && props.hotspots.length !== 0) ? <Marker lat={13.0827} lng={80.2707}/> : "";

    let locationCenter = {
        lat: 13.0827,
        lng: 80.2707
    };

    if(props.currentLocation && props.currentLocation.lat && props.currentLocation.lng ) {
        locationCenter = {
            lat: props.currentLocation.lat,
            lng: props.currentLocation.lng
        }
    } else if(props.hotspots && props.hotspots.length !== 0) {
        locationCenter = {
            lat: parseFloat(props.hotspots[0].lat),
            lng: parseFloat(props.hotspots[0].lon)
        }
    }

    const hostspotzone = (map) => {
        if( props.hotspots &&  props.hotspots.length !== 0) {
            props.hotspots.map((hotspot, key) =>
            new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.0,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.3,
                map,
                center: {lat: parseFloat(hotspot.lat), lng: parseFloat(hotspot.lon)},
                radius: 1000,
            }));
        }

    };

    return (
        <div style={{height: props.height, width: props.width}}>
            <GoogleMapReact
                bootstrapURLKeys={{key: "AIzaSyCCuPYXot_6UOeBPPp4pHVqHVfK_k9SLMY"}}
                center={props.position ? props.position : locationCenter}
                zoom={13}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({map, maps}) => {hostspotzone(map)}}
            >
                {marker}
                {defaultMarker}
            </GoogleMapReact>
        </div>
    )
};

export default MapComponent;
