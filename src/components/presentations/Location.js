import React, {useState} from 'react';
import MapComponent from "./MapComponent";
import PlacesAutocomplete, { geocodeByAddress, getLatLng,} from 'react-places-autocomplete';
import Divider from "@material-ui/core/Divider/index";
import Button from "@material-ui/core/Button/index";

const Location = (props) => {

    const [position, setPosition] = useState({
        lat: 13.0827,
        lng: 80.2707
    });

    const [address, setAddress] = useState("");

    const [location, setLocation] = useState({
        lat : "",
        lon : "",
        state : "",
        city : "",
        area: "",
        country: ""
    });


    const updateLocation = (mapData) => {
        const address_components = mapData.address_component;
        let updateLocation = {
            state : "",
            city : "",
            area: "",
            country: ""
        };

        address_components.forEach(address_component => {
            if (address_component.types[0] === "political") {
                updateLocation.area = address_component.long_name;
            }

            if (address_component.types[0] === "locality") {
                console.log("town:" + address_component.long_name);
                updateLocation.city = address_component.long_name;
            }

            if (address_component.types[0] === "administrative_area_level_1") {
                console.log("town:" + address_component.long_name);
                updateLocation.state = address_component.short_name;
            }

            if (address_component.types[0] === "country") {
                console.log("country:" + address_component.long_name);
                updateLocation.country = address_component.long_name;

            }
        });

        setLocation({
            ...location,
            updateLocation
        })
    };

    const updateLatLng = (data) => {
      setLocation({
          ...location,
          lat : data.lat,
          lon : data.lng,
      });
    };

    const handleSelect = async value => {
        console.log(value);
        geocodeByAddress(address)
            .then(results => {
                console.log(results);
                const data = results[0];
                const latLng = getLatLng(data);
                updateLocation(data);
                updateLatLng(latLng);
                return latLng;
            })
            .then(latLng => {
                setPosition(latLng);
            })
            .catch(error => console.error('Error', error));
    };

    const goBack = () => {
        props.updateStepper();
    }

    return (
        <div>
            <div className={"_title"}>
                <div style={{fontSize: "x-large"}}>Location Info</div>
                <div className={"underline"}/>
            </div>
            <div className={"_subtitle"}>What is the patient location?</div>
            <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={handleSelect.bind(this)}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div className={"auto-complete"}>
                        <input
                            {...getInputProps({
                                placeholder: 'Locality..',
                                className: 'location-search-input form-control',
                            })}
                        />
                        <div className="autocomplete-dropdown-container custom-dropdown-style">


                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                                const className = suggestion.active
                                    ? 'suggestion-item--active custom-dropdown-item'
                                    : 'suggestion-item custom-dropdown-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                    <div>
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
            <MapComponent height={"200px"} width={"100%"} position={position}/>
            <div className={"justify-end"}>
                <Button onClick={() => goBack()} style={{marginRight: "19%", background: "#dfe0e0"}}>
                    Back
                </Button>

                <Button variant="contained" color="primary" className={"_button"} >
                    Complete
                </Button>
            </div>
        </div>
    )
};

export default Location;



