import React, {useState} from 'react';
import PlacesAutocomplete, {geocodeByAddress, getLatLng,} from 'react-places-autocomplete';
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import CloseIcon from '@material-ui/icons/Close';
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: "90vw",
        margin: "0 auto"
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        padding: "6px 0px"
    },
    iconButton: {
        padding: 10,
    }
}));

const LocationSearchInput = (props) => {

    const classes = useStyles();

    const [address, setAddress] = useState("");

    const handleSelect = address => {
        setAddress(address);
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                props.updatePosition(latLng);
            })
            .catch(error => console.error('Error', error));
    };

    return (
        <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
        >
            {({getInputProps, suggestions, getSuggestionItemProps}) => (
                <div className={"location-search-container"}>
                    <Paper className={classes.root}>
                        <InputBase
                            className={classes.input}
                            id={"input-attr"}
                            value={address}
                            {...getInputProps({
                                placeholder: 'Search Hotspots'
                            })}
                        />
                        <IconButton style={{display: address && address.trim().length !== 0 ? "block" : "none"}}
                                    className={classes.iconButton} type="submit" aria-label="search" onClick={() => setAddress("")}>
                            <CloseIcon/>
                        </IconButton>
                    </Paper>
                    <div className="autocomplete-dropdown-container custom-dropdown-style">
                        {suggestions.map((suggestion, key) => {
                            const className = suggestion.active
                                ? 'suggestion-item--active custom-dropdown-item'
                                : 'suggestion-item custom-dropdown-item';
                            // inline style for demonstration purpose
                            const style = suggestion.active
                                ? {backgroundColor: '#fafafa', cursor: 'pointer'}
                                : {backgroundColor: '#ffffff', cursor: 'pointer'};
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
    );

};

export default LocationSearchInput;
