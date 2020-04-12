import React, {useState} from 'react';
import GoogleMapReact from "google-map-react";
import {LocationOn} from "@material-ui/icons";
import "../../styles/map.css";

const google = window.google;

const MapComponent = (props) => {

    const [displayBadge, setDisplayBadge] = useState(true);

    const Marker = () => <LocationOn className={"location-pointer"}/>;

    const CurrentLocationPointer = () => <div className={"location-pointer outer-circle"}> <div className={"inner-circle"}/></div> ;

    const HostSpotCount = ({ count }) => <div className={"badge-unique"} style={{ display: displayBadge ? "flex" : "none"}}>{count}</div>

    const marker = props.position && props.showMarker ? <Marker className={"location-pointer"} lat={props.position.lat} lng={props.position.lng}/> : "";


    let isHotSpotAvailable = props.hotspots && props.hotspots.length !== 0;
    const defaultMarker = !props.position && !(isHotSpotAvailable) ? <Marker className={"location-pointer"} lat={13.0827} lng={80.2707}/> : "";

    const hotSpotCount = isHotSpotAvailable ? props.hotspots.map((hotspot, key) => <HostSpotCount key={key} lat={hotspot.lat} lng={hotspot.lon} count={hotspot.count} /> ) :  "";

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

    } else if(isHotSpotAvailable) {
        locationCenter = {
            lat: parseFloat(props.hotspots[0].lat),
            lng: parseFloat(props.hotspots[0].lon)
        }
    }

    const hostspotzone = (map) => {
        if( props.hotspots &&  props.hotspots.length !== 0) {
            props.hotspots.map((hotspot, key) =>
            new google.maps.Circle({
                strokeColor: '#f5005696',
                strokeOpacity: 0.0,
                strokeWeight: 2,
                fillColor: '#f5005696',
                fillOpacity: 0.7,
                map,
                center: {lat: parseFloat(hotspot.lat), lng: parseFloat(hotspot.lon)},
                radius: 1000,
            }));
        }

    };

    return (
        <div style={{height: props.height, width: props.width}}>
            <GoogleMapReact
                onChange={({zoom}) => {
                   if(zoom < 13) {
                       setDisplayBadge(false);
                   } else {
                       setDisplayBadge(true);
                   }
                }}
                bootstrapURLKeys={{key: "AIzaSyCCuPYXot_6UOeBPPp4pHVqHVfK_k9SLMY"}}
                center={props.position ? props.position : locationCenter}
                zoom={props.zoom}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({map, maps}) => {hostspotzone(map)}}
            >
                {marker}
                {currentLocationPointer}
                {hotSpotCount}
                {defaultMarker}
            </GoogleMapReact>
        </div>
    )
};

export default MapComponent;
