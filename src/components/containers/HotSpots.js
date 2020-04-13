import React, {useEffect, useState} from 'react';
import MapComponent from "../presentations/MapComponent";
import axios from 'axios';
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import {GpsFixed} from "@material-ui/icons";
import LocationSearchInput from "../presentations/LocationSearchInput";
import { APIURL } from '../../configs/app-config';

const Hotspots = () => {

    const [position, setPosition] = useState(null);

    const [currentLocation, setCurrentLocation] = useState({});

    const [open, setOpen] = useState(false);

    const [zoom, setZoom] = useState(13);

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

    // useEffect(() => {
    //     initNotifier();
    // }, [currentLocation]);
    //
    const initNotifier = () => {
        if (!localStorage.getItem("scheduled")) {
            setInterval(() => {
                if (currentLocation.lat && currentLocation.lng && hotSpots.length !== 0) {
                    axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + currentLocation.lat + "," + currentLocation.lng + "&sensor=true&key=AIzaSyCCuPYXot_6UOeBPPp4pHVqHVfK_k9SLMY")
                        .then((response) => {
                            for (let i in hotSpots) {
                                const data = response.data.results[0].address_components.find(address => {
                                    console.log(address.long_name.toLowerCase().indexOf(hotSpots[i].area.toLowerCase()) !== -1);
                                    return address.long_name.toLowerCase().indexOf(hotSpots[i].area.toLowerCase()) !== -1
                                });
                                if (data) {
                                    window.cordova.plugins.notification.local.schedule({
                                        title: 'CovidPulse - Warning',
                                        text: 'You are in COVID-19 HotZone, around ' + hotSpots[i].count + ' people has been affected in ' + hotSpots[i].area +'.Be cautious and maintain social distance.',
                                        foreground: true
                                    });
                                    break;
                                }
                            }
                        });
                    localStorage.setItem("scheduled", true);
                }

            }, 600000);
        }
    };

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
        axios.get( APIURL + "hotspots")
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
