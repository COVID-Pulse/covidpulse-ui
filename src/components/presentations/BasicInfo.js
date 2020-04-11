import React, {useState} from 'react';
import FormControl from "@material-ui/core/FormControl/index";
import RadioGroup from "@material-ui/core/RadioGroup/index";
import FormControlLabel from "@material-ui/core/FormControlLabel/index";
import Radio from "@material-ui/core/Radio/index";
import Button from "@material-ui/core/Button/index";
import {InputLabel, Paper, TextField} from '@material-ui/core';

const BasicInfo = (props) => {

    const [basicInfo, setBasicInfo] = useState({
        age: "",
        gender: "",
        symptom: ""
    });

    const updateBasicInfo = (event) => {
        if (event.target.id === "age") {
            setBasicInfo({
                ...basicInfo,
                age: event.target.value
            })
        } else {
            setBasicInfo({
                ...basicInfo,
                symptom: event.target.value
            })
        }
    };

    const updateGender = (event) => {
        setBasicInfo({
            ...basicInfo,
            gender: event.target.value
        })
    };

    const updateParentInfo = () => {
        props.updateParentInfo(basicInfo);
    };

    return (
        <div>

            <Paper elevation={0} >
                <h3 className={"_title"}>
                    <div>Basic Info</div>
                </h3>
                <div className={"_subtitle"}>Please provide the details about the patient</div>
            </Paper>

            <Paper elevation={0} className="form-container">

                <div className={"form-space"}>
                    <TextField id="age" onChange={updateBasicInfo.bind(this)} size="small" label="Age" variant="outlined" />
                </div>
                <div className={"form-space"}>
                    <FormControl component="fieldset">
                        <InputLabel for="gender">Gender</InputLabel>
                        <RadioGroup row aria-label="position" name="position" id={"gender"} defaultValue="top" onChange={updateGender.bind(this)}>
                            <FormControlLabel value="M" control={<Radio color="primary" />} label={<span className={"gender"}>Male</span>}/>
                            <FormControlLabel value="F" control={<Radio color="primary" />} label={<span className={"gender"}>Female</span>}/>
                            <FormControlLabel value="T" control={<Radio color="primary" />} label={<span className={"gender"}>Others</span>}/>
                        </RadioGroup>
                    </FormControl>
                </div>

                <div className="form-group">
                    <label className={"_label"}>Patient Symptoms</label>
                    <textarea className="form-control patient-symptom" rows="5" id={"symptoms"} value={basicInfo.symptom} onChange={updateBasicInfo.bind(this)}/>
                </div>
                <div className="btn-cont">
                    <Button variant="contained" color="primary" className={"_button"} onClick={() => updateParentInfo()}>
                        Next
                    </Button>
                </div>
            </Paper>
        </div>
    )
};

export default BasicInfo;
