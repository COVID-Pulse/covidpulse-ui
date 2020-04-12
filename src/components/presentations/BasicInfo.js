import React, {useState, useEffect} from 'react';
import FormControl from "@material-ui/core/FormControl/index";
import RadioGroup from "@material-ui/core/RadioGroup/index";
import FormControlLabel from "@material-ui/core/FormControlLabel/index";
import Radio from "@material-ui/core/Radio/index";
import Button from "@material-ui/core/Button/index";
import {InputLabel, Paper, TextField, Snackbar} from '@material-ui/core';

import Alert from '@material-ui/lab/Alert';
import AutoCompleteChip from './autocomplete-chip';

const symptoms = [
    { label : 'cough' }, 
    { label : 'fever' }, 
    { label : 'tiredness' }, 
    { label : 'Shortness of breath' },
    { label : 'Persistent pain or pressure in the chest' },
    { label : 'New confusion or inability to arouse' },
    { label : 'Bluish lips or face' },
    { label : 'Trouble breathing' },
    
]


const BasicInfo = (props) => {

    const [basicInfo, setBasicInfo] = useState({
        age: "",
        gender: "",
        symptom: "",
    });

    const [formValid, setFormValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const updateBasicInfo = (event) => {
        if (event.target.id === "age") {
            setBasicInfo({
                ...basicInfo,
                age: event.target.value
            });
        } else {
            setBasicInfo({
                ...basicInfo,
                symptom: event.target.value
            });
        }
    };

    useEffect(() => {
        checkForm();
    }, [basicInfo])

    const updateGender = (event) => {
        setBasicInfo({
            ...basicInfo,
            gender: event.target.value
        })
    };

    const updateParentInfo = () => {
        props.updateParentInfo(basicInfo);
    };

    const checkForm = () => {
        setFormValid(false);
        if (  
            basicInfo.age !== '' && 
            !( parseInt(basicInfo.age) >= 1 && parseInt(basicInfo.age) <= 120)
        ) {
            setErrorMessage('Age is not valid!');
            return;
        }
        setErrorMessage('');
        if ( basicInfo.gender === '' ) {
            return;
        }
        if ( 
            basicInfo.age === '' || 
            ( typeof(basicInfo.age) === "string" && basicInfo.age.trim().length === 0 )
        ) { return; }
        setFormValid(true);
    }

    const handleOnChange = (value) => {
        basicInfo.symptom = value.map( (v) => v.label ).toString();
    }

    const handleClose = () => setErrorMessage('');
    return (
        <div style={{width : "100%"}}>

            <Snackbar open={errorMessage.length > 0} autoHideDuration={5000} anchorOrigin={{vertical : 'top', horizontal : 'right'}} onClose={handleClose} >
                <Alert variant="filled" severity="error">
                    {errorMessage}
                </Alert>
            </Snackbar>

            <Paper elevation={0} >
                <h3 className={"_title"} style={{padding : "0 24px"}}>
                    <div>Basic Info</div>
                </h3>
                <div className={"_subtitle"}>Please provide the details about the patient</div>
            </Paper>

            <Paper elevation={0} className="form-container">

                <div className={"form-space"}>
                    <TextField type="number" id="age" onChange={updateBasicInfo.bind(this)} size="small" label="Age" variant="outlined" />
                </div>
                <div className={"form-space"}>
                    <FormControl component="fieldset">
                        <InputLabel>Gender</InputLabel>
                        <RadioGroup row aria-label="position" name="position" id={"gender"} defaultValue="top" onChange={updateGender.bind(this)}>
                            <FormControlLabel value="M" control={<Radio color="primary" />} label={<span className={"gender"}>Male</span>}/>
                            <FormControlLabel value="F" control={<Radio color="primary" />} label={<span className={"gender"}>Female</span>}/>
                            <FormControlLabel value="T" control={<Radio color="primary" />} label={<span className={"gender"}>Others</span>}/>
                        </RadioGroup>
                    </FormControl>
                </div>

                <AutoCompleteChip onChange={handleOnChange} label="Patient Symptoms" data={symptoms} ></AutoCompleteChip>

                <div className="btn-cont">
                    <Button disabled={!formValid} variant="contained" color="primary" className={"_button"} onClick={() => updateParentInfo()}>
                        Next
                    </Button>
                </div>
            </Paper>
        </div>
    )
};

export default BasicInfo;
