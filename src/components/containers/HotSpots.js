import React, {useEffect, useState} from 'react';
import MapComponent from "../presentations/MapComponent";
import axios from 'axios';
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import {GpsFixed} from "@material-ui/icons";
import LocationSearchInput from "../presentations/LocationSearchInput";

const Hotspots = () => {

    const [position, setPosition] = useState(null);

    const [currentLocation, setCurrentLocation] = useState({});

    const [open, setOpen] = useState(false);

    const [zoom, setZoom] =  useState(13);

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const [hotSpots, setHotSpots] = useState([]);

    useEffect(() => {
        fetchHotspots();
    }, []);

    const getPosition = async () => {
        handleClose();
        await navigator.geolocation.getCurrentPosition(
            position => {
                handleClose();
                setCurrentLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            },
            err => {
                console.log(err);
                handleClose();
            }
        );
    };

    const fetchHotspots = () => {
        handleOpen();
        axios.get("https://covid-pulse-api.herokuapp.com/api/covid19/hotspots")
            .then((response) => {
                setHotSpots(response.data.results);
            }).then(() => getPosition())
            .catch((error) => {
                console.log(error);
                handleClose();
            });
    };

    const updatePosition = (location) => {
        console.log("Updating location");
        setPosition(location);
    };

    const repositionUser = () => {
        setPosition(null);
        setZoom(zoom + 0.1);
        setCurrentLocation({
            lat: currentLocation.lat,
            lng: currentLocation.lng + 0.00001
        });
    };

    return (
        <div>
            {open ? <Backdrop open={open} style={{zIndex: "9999"}} onClick={handleClose}>
                    <CircularProgress color="inherit"/>
                </Backdrop> :
                (
                    <div>
                        <Button className={"reposition-but"} onClick={() => repositionUser()}>
                            <GpsFixed/>
                        </Button>
                        <LocationSearchInput updatePosition={updatePosition.bind(this)}/>
                        <MapComponent
                            height={"95vh"} width={"100%"}
                            currentLocation={currentLocation}
                            hotspots={hotSpots}
                            repositionUser={() => repositionUser()}
                            showReposition={true}
                            position={position}
                            showMarker={false}
                            zoom={zoom}
                        />
                    </div>)
            }
        </div>
    )
};


export default Hotspots;
