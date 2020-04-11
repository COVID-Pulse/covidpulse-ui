import React, {useState} from 'react';
import BasicInfo from "../presentations/BasicInfo";
import Location from "../presentations/Location";
import "../../styles/stepper.css"

const Report = () => {

    const [stepperIndex, setStepperIndex] = useState(0);

    const [report, setReport] = useState( {
        age : '',
        gender : '',
        symptom : '',
        state : '',
        city : '',
        lat : '',
        lon : '',
        area : ''
    });

    const increaseStepper = () => {
        setStepperIndex(stepperIndex + 1);
    };

    const decreaseStepper = () => {
        setStepperIndex(stepperIndex - 1);
    };

    const updateBasicInfo = (data) => {
        console.log("Basic");
        setReport({
            ...report,
            age: data.age,
            gender: data.gender,
            symptom: data.symptom
        });
        increaseStepper();
    };

    const updateLocationAndPostReport = (data) => {
        console.log("Location");
        setReport({
            ...report,
            state : data.state,
            city : data.city,
            lat : data.lat,
            lon : data.lon,
            area: data.area,
            country: data.area
        });
        console.log(report);
    };

    const stepperComponents = [
        {
            component: <BasicInfo updateParentInfo={updateBasicInfo.bind(this)}/>
        }, {
            component: <Location updateStepper={() => decreaseStepper()} updateLocationAndPostReport={updateLocationAndPostReport.bind(this)}/>
        }
    ];

    return (
        <div className={"_stepper-wrapper"}>
            {stepperComponents[stepperIndex].component}
        </div>
    )
};


export default Report;
