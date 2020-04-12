import React from 'react';
import GoogleMapReact from "google-map-react";
import {LocationOn} from "@material-ui/icons";
import "../../styles/map.css";

const google = window.google;

const MapComponent = (props) => {

    const Marker = () => <LocationOn className={"location-pointer"}/>;

    const CurrentLocationPointer = () => <div className={"location-pointer outer-circle"}> <div className={"inner-circle"}/></div> ;

    const marker = props.position && props.showMarker ? <Marker lat={props.position.lat} lng={props.position.lng}/> : "";


    const defaultMarker = !props.position && !(props.hotspots && props.hotspots.length !== 0) ? <Marker lat={13.0827} lng={80.2707}/> : "";

    let locationCenter = {
        lat: 13.0827,
        lng: 80.2707
    };

    let currentLocationPointer = "";

    if(props.currentLocation && props.currentLocation.lat && props.currentLocation.lng ) {
        locationCenter = {
            lat: props.currentLocation.lat,
            lng: props.currentLocation.lng
        };

        currentLocationPointer = <CurrentLocationPointer lat={props.currentLocation.lat} lng={props.currentLocation.lng}/>

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
                zoom={props.zoom}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({map, maps}) => {hostspotzone(map)}}
            >
                {marker}
                {currentLocationPointer}
                {defaultMarker}
            </GoogleMapReact>
        </div>
    )
};

export default MapComponent;
