import React, {useState} from 'react';
import GoogleMapReact from "google-map-react";
import {LocationOn} from "@material-ui/icons";
import "../../styles/map.css";

const google = window.google;

const MapComponent = (props) => {

    const [displayBadge, setDisplayBadge] = useState(false);

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


    const toggleBounce = (marker) => {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
          setTimeout( () => {
            marker.setAnimation(null);
          }, 500)
        }
    }

    const getCircleMarker = (hotspot, map) => {
        const marker = new google.maps.Circle({
            strokeColor: '#f5005696',
            strokeOpacity: 0.0,
            strokeWeight: 2,
            fillColor: '#f5005696',
            fillOpacity: 0.7,
            map,
            center: {lat: parseFloat(hotspot.lat), lng: parseFloat(hotspot.lon)},
            radius: 1000
        });
        marker.addListener('hover', () => {
            console.log('hovered');
        });
        return marker;
    }

    const getLocMarker = (hotspot, map ) => {
        const marker = new google.maps.Marker({
            label: {
                color : '#fff',
                fontWeight: '900',
                text : parseFloat(hotspot.count).toString()
            },
            map : map,
            animation: google.maps.Animation.DROP,
            position : {lat: parseFloat(hotspot.lat), lng: parseFloat(hotspot.lon)}
        });
        marker.addListener('click', (e) => {
            var contentString = `<div id="content" style="font-size: 12px;padding: 6px;">
                <div style="font-weight: 600;">
                    Affected Area
                </div>
                <div>
                   ${hotspot.area} 
                </div>
                <div style="font-weight: 600; padding-top: 10px;">
                    Infected Count
                </div>
                <div>
                   ${hotspot.count} 
                </div>
            </div>`

            const infowindow = new google.maps.InfoWindow({
                content: contentString
            });
            infowindow.open(map, marker);
            toggleBounce(marker) 
        });
        return marker; 
    }

    const hostspotzone = (map) => {
        if( props.hotspots &&  props.hotspots.length !== 0) {
            props.hotspots.map((hotspot, i) => {
                return<div>
                    {getCircleMarker(hotspot, map)}
                    {getLocMarker(hotspot, map)}
                </div>
            });
        }

    };

    return (
        <div style={{height: props.height, width: props.width}}>
            <GoogleMapReact
                bootstrapURLKeys={{key: "API-KEY"}}
                center={props.position ? props.position : locationCenter}
                zoom={props.zoom}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({map, maps}) => {hostspotzone(map)}}>
                {marker}
                {currentLocationPointer}
                {hotSpotCount}
                {defaultMarker}
            </GoogleMapReact>
        </div>
    )
};

export default MapComponent;
