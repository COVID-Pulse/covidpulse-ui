import React, {useEffect, useState} from 'react';
import MapComponent from "../presentations/MapComponent";
import axios from 'axios';
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
const Hotspots = () => {
    const [currentLocation, setCurrentLocation] = useState({});

    const [open, setOpen] = React.useState(false);

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

    const fetchHotspots = () => {
        handleOpen();
        axios.get("https://covid-pulse-api.herokuapp.com/api/covid19/hotspots")
            .then((response) => {
                setHotSpots(response.data.results);
                handleClose();
            }).catch((error) => console.log(error));
    };

    return (
        <div>
            {open ? <Backdrop open={open} style={{zIndex: "9999"}} onClick={handleClose}>
                    <CircularProgress color="inherit"/>
                </Backdrop> :
                <MapComponent height={"95vh"} width={"100%"} currentLocation={currentLocation} hotspots={hotSpots}/>
            }
        </div>
    )
};


export default Hotspots;
