import React, {useState} from 'react';
import FormControl from "@material-ui/core/FormControl/index";
import RadioGroup from "@material-ui/core/RadioGroup/index";
import FormControlLabel from "@material-ui/core/FormControlLabel/index";
import Radio from "@material-ui/core/Radio/index";
import Button from "@material-ui/core/Button/index";
import Divider from "@material-ui/core/Divider/index";


const BasicInfo = (props) => {

    const [basicInfo, setBasicInfo] = useState({
        age: "",
        gender: "",
        symptom: ""
    });

    const updateBasicInfo = (event) => {
        if(event.target.id === "age") {
            setBasicInfo({
                ...basicInfo,
                age: event.target.value
            })
        }  else  {
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
            <h3 className={"_title"}>
                <div>Basic Info</div>
                <div className={"underline"}></div>
            </h3>
            <div className={"_subtitle"}>Please provide the details about the patient</div>
            <div>
                <div className={"form-space"}>
                    <label className={"_label"}>Age</label>
                    <input id="age"
                           className={"form-control"}
                           type="number"
                           onChange={updateBasicInfo.bind(this)}/>

                </div>
                <div className={"form-space"}>
                    <FormControl component="fieldset">
                        <div className={"_label"}>Gender</div>
                        <RadioGroup row aria-label="position" name="position" id={"gender"} defaultValue="top" onChange={updateGender.bind(this)}>
                            <FormControlLabel value="M" control={<Radio color="primary" />} label={<span className={"gender"}>Male</span>}/>
                            <FormControlLabel value="F" control={<Radio color="primary" />} label={<span className={"gender"}>Female</span>}/>
                            <FormControlLabel value="T" control={<Radio color="primary" />} label={<span className={"gender"}>Trangender</span>}/>
                        </RadioGroup>
                    </FormControl>
                </div>

                <Divider className={"_divider"}/>

                <div className="form-group form-space">
                    <label className={"_label"}>Patient Symptoms</label>
                    <textarea className="form-control" rows="5" id={"symptoms"} value={basicInfo.symptom} onChange={updateBasicInfo.bind(this)}/>
                </div>
                <div className={"justify-end"}>
                    <Button variant="contained" color="primary" className={"_button"} onClick={() => updateParentInfo()}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
};

export  default BasicInfo;
