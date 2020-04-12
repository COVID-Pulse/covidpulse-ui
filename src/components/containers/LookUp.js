import React, {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import ListComponent from "../presentations/ListComponent";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";

const LookUp = () => {


    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const [lookUp, setLookUp] = useState({
        reportedByMe: [],
        others: []
    });

    const [scrolling, setscrolling] = useState(false);

    useEffect(() => {
        fetchReports();
    }, []);


    const fetchReports = () => {
        handleOpen();
        axios.get("https://covid-pulse-api.herokuapp.com/api/covid19/report")
            .then((response) => {
                let respReportByMe = [];
                let respOthers = [];

                response.data.map(lookupData => {
                    if (lookupData.reported_by && lookupData.reported_by.toLowerCase() === localStorage.getItem("deviceId").toLowerCase()) {
                        respReportByMe.push(lookupData);
                    } else {
                        respOthers.push(lookupData);
                    }
                    return true;
                });
                setLookUp({
                    reportedByMe: respReportByMe,
                    others: respOthers
                });

            }).then(() => handleClose())
            .catch((error) => {
                console.log(error);
                handleClose();
            });
    };

    const deleteReports = (id) => {
        console.log(id);
        handleOpen();
        axios.delete("https://covid-pulse-api.herokuapp.com/api/covid19/report/" + id)
            .then((response) => {
                fetchReports();
            }).then(() => handleClose())
            .catch((error) => {
                handleClose();
                console.log(error);
            });
    };

    const handleScroll = (e) => {
        if ( e.target.scrollTop > 10 )  {
            setscrolling(true)
            return;
        }
        setscrolling(false)
    }

    return (
        <div>
            <div className={"_wrapper"} onScroll={handleScroll} >
                <Backdrop open={open} style={{zIndex: "9999"}} onClick={handleClose}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
                <Paper elevation={0}>
                    <div className={scrolling ? ' onscroll _title float-top' : '_title float-top'  }>Lookup Case
                        <Button size="small" component={Link} to={"/report"} style={{float: "right"}} className={"report-case-but"}
                                variant="outlined" color="primary">
                            <span className={"add-icon"}>+</span> Report Case
                        </Button>
                    </div>

                </Paper>
                <div className={"lookup-container"}>
                    <div className={"lookup-section-header"}>Report by me</div>
                    <ListComponent reports={lookUp.reportedByMe} byMyself={true}
                                   deleteReport={deleteReports.bind(this)}/>
                </div>
                <div className={"lookup-container"}>
                    <div className={"lookup-section-header"}>Others</div>
                    <ListComponent reports={lookUp.others} byMyself={false} deleteReport={deleteReports.bind(this)}/>
                </div>
            </div>
        </div>
    )
};


export default LookUp;
