import React from 'react';
import GoogleMapReact from "google-map-react";
import {LocationOn} from "@material-ui/icons";

const Marker = () => <LocationOn style={{color: "#bd4949"}}/>;

const MapComponent = (props) => {


    return (
        <div style={{ height: props.height, width: props.width }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyCCuPYXot_6UOeBPPp4pHVqHVfK_k9SLMY" }}
                center={props.position}
                zoom={11}
            >
                <Marker
                    lat={props.position.lat}
                    lng={props.position.lng}
                />
            </GoogleMapReact>
        </div>
    )
};

export default MapComponent;
