import React, {useState} from 'react';
import BasicInfo from "../presentations/BasicInfo";
import Location from "./Location";
import "../../styles/stepper.css"
import axios from 'axios';
import {AXIOS_CONFIGS} from "../../configs/axios-configs";

const Report = () => {

    const [stepperIndex, setStepperIndex] = useState(0);

    const [loading, setLoading] = useState(false);

    const [report, setReport] = useState( {
        age : '',
        gender : '',
        symptom : ''
    });

    const increaseStepper = () => {
        setStepperIndex(stepperIndex + 1);
    };

    const decreaseStepper = () => {
        setStepperIndex(stepperIndex - 1);
    };

    const updateBasicInfo = (data) => {
        setReport({
            ...report,
            age: data.age,
            gender: data.gender,
            symptom: data.symptom
        });
        increaseStepper();
    };

    const updateLocationAndPostReport = (data) => {
        const payload = {
            age : report.age,
            gender : report.gender,
            symptom : report.symptom,
            state : data.state,
            city : data.city,
            lat : data.lat,
            lon : data.lon,
            area : data.area,
            country: data.country,
            reported_by: localStorage.getItem("deviceId")
        };

        setLoading(true);
        axios.post("https://covid-pulse-api.herokuapp.com/api/covid19/report/", payload, AXIOS_CONFIGS)
            .then((result) => {
                console.log(result);
                decreaseStepper();
            }).catch((error) => {
                console.log(error);
        }).finally(() => {
            setLoading(false);
        });
        console.log(payload);
    };

    const stepperComponents = [
        {
            component: <BasicInfo updateParentInfo={updateBasicInfo.bind(this)}/>
        }, {
            component: <Location updateStepper={() => decreaseStepper()} updateLocationAndPostReport={updateLocationAndPostReport.bind(this)} loading={loading}/>
        }
    ];

    return (
        <div className={"_stepper-wrapper _wrapper"}>
            {stepperComponents[stepperIndex].component}
        </div>
    )
};


export default Report;
