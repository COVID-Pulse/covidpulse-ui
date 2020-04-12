import React, {useState} from 'react';
import MapComponent from "../presentations/MapComponent";
import PlacesAutocomplete, { geocodeByAddress, getLatLng,} from 'react-places-autocomplete';
import Divider from "@material-ui/core/Divider/index";
import Button from "@material-ui/core/Button/index";
import CircularProgress from "@material-ui/core/CircularProgress/index";
import "../../styles/location.css";

const Location = (props) => {

    const [position, setPosition] = useState({
        lat: 13.0827,
        lng: 80.2707
    });

    const [address, setAddress] = useState("");

    const [locationInfo, setLocationInfo] = useState({
        state : "",
        city : "",
        area: "",
        country: ""
    });



    const updateLocation = (mapData) => {
        const address_components = mapData.address_components;


        let updateLocationData = {
            state : "",
            city : "",
            area: "",
            country: ""
        };

        address_components.map( address_component => {
            address_component.types.map( (typ) => {
                if ( typ === "political" ) {
                    updateLocationData.area = address_component.long_name;
                }
    
                if ( typ === "locality" ) {
                    updateLocationData.city = address_component.long_name;
                }
    
                if ( typ === "administrative_area_level_1" ) {
                    updateLocationData.state = address_component.short_name;
                }
    
                if ( typ === "country" ) {
                    updateLocationData.country = address_component.long_name;
                }
            })
            return true;
        });
        return updateLocationData;
    };

    const handleSelect = async value => {
        setAddress(value);
        geocodeByAddress(value)
            .then(results => {
                const data = results[0];
                const latLng = getLatLng(data);
                const updateLocationData = updateLocation(data);
                setLocationInfo({
                    ...Location,
                    state : updateLocationData.state,
                    city : updateLocationData.city,
                    area: updateLocationData.area,
                    country: updateLocationData.country

                });
                return latLng;
            })
            .then(latLng => {
                console.log(latLng);
                setPosition(latLng);
            })
            .catch(error => console.error('Error', error));
    };


    const completeInfo = () => {
        locationInfo["lat"] = position.lat;
        locationInfo["lon"] = position.lng
        props.updateLocationAndPostReport(locationInfo);
    };

    return (
        <div style={{width : "100%"}}>
            <div className={"_title"} style={{padding : "0 24px"}}>
                <div style={{fontSize: "x-large"}}>Location Info</div>
            </div>
            <div className="_subtitle">
                Please selet the location of the patient 
            </div>
            
            <div className="location-wrapper" >
                <PlacesAutocomplete
                    value={address}
                    onChange={setAddress}
                    onSelect={handleSelect}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div className={"auto-complete"}>
                            <input
                                {...getInputProps({
                                    placeholder: 'Locality..',
                                    className: 'location-search-input form-control',
                                })}
                                value={address}
                            />
                            <div className="autocomplete-dropdown-container custom-dropdown-style">
                                {suggestions
                                    .map((suggestion, key) => {
                                    const className = suggestion.active
                                        ? 'suggestion-item--active custom-dropdown-item'
                                        : 'suggestion-item custom-dropdown-item';
                                    const style = suggestion.active
                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                    return (
                                        <div key={key}>
                                            <div
                                                {...getSuggestionItemProps(suggestion, {
                                                    className,
                                                    style,
                                                })}
                                            >
                                                <span>{suggestion.description}</span>
                                            </div>
                                            <Divider/>
                                        </div>
                                    );
                                })}

                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>
                <MapComponent height={"250px"} width={"100%"} position={position} showMarker={true} zoom={13}/>
            </div>
            
            <div className={"btn-cont"} style={{ justifyContent : 'justify-center', padding : '0 24px' }}>
                <Button variant="contained" color="primary" className={"_button"} 
                    disabled={props.loading || locationInfo.state === '' || locationInfo.country === '' || locationInfo.city === ''} 
                    onClick={completeInfo.bind(this)} >
                    {props.loading ? <CircularProgress size={20} color={"secondary"}/> : "Complete"}
                </Button>
            </div>
        </div>
    )
};

export default Location;



