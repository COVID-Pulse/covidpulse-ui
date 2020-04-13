import React, {useState} from 'react';
import '../../styles/lookup.css';
import Card from "@material-ui/core/Card";
import glass from '../../assets/icons/glass.svg'
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import {HighlightOff } from "@material-ui/icons";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";


const ListComponent = (props) => {

    const colorPalette = [
      "#3f51b5", "#28a745", "#fd7e14", "#007bff"
    ];

    const [open, setOpen] = useState(false);

    const [toBeDeleted, setToBeDelete] = useState("");

    const getGender = (value) => {
         if(value === "M") {
             return "Male";
         } else if(value === "F") {
             return "Female";
         } else  {
             return "Transgender";
         }
    };

    const handleClickOpen = (id, event) => {
        console.log(id);
        setToBeDelete(id);
        setOpen(true);
    };

    const handleCloseAndDelete = () => {
        setOpen(false);
        console.log(toBeDeleted);
        props.deleteReport(toBeDeleted);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {props.reports && props.reports.length !== 0 ?
                props.reports.map((report, key) => (
                    <Card className="section-wrapper" key={key}>
                        <Grid container className={"grid-container"}>
                                <Grid item xs={2}>
                                    <div className={"report-divider"}>
                                        <Avatar className={"avatar-details"} style={{opacity: ".9", backgroundColor: colorPalette[Math.floor(Math.random() * (4))]}}>P{report.id}</Avatar>
                                    </div>
                                </Grid>
                                <Grid item xs={10}>
                                    <Grid container style={{ paddingLeft : "10px" }} >
                                        <Grid item xs={12} style={{ paddingBottom : "8px" }} >
                                            <span className={"section-header"}>Patient - {report.id}</span>
                                            { props.byMyself ? <HighlightOff style={{ position : "absolute" , right : 0 }} className={"delete"} onClick={() => handleClickOpen(report.id)}/> : <div/>}
                                        </Grid>
                                        <Grid item xs={4}>
                                            <span className={"section-label"}>age</span>
                                            <span className={"section-value"}>{report.age}</span>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <span className={"section-label"}>gender</span>
                                            <span className={"section-value"}>{getGender(report.gender)}</span>
                                        </Grid>
                                        <Grid item xs={12} style={{marginTop: "10px"}}>
                                            <span className={"section-label"}>symptoms</span>
                                            <span className={"section-chip"}>{report.symptom.split(",").map((s, k) => <Chip key={k} color="primary" variant="outlined" label={s} style={{marginRight: "5px", marginBottom : "5px", textTransform : "capitalize"}} />)}</span>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                    </Card>
                ))
                :
                <Card className={"no-data-card"}>
                    <img src={glass} alt=""  />
                    <div>No reports found :)</div>
                </Card>
            }
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete Case"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure want to delete the case?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAndDelete} color="secondary" autoFocus>
                        Agree
                    </Button>
                    <Button onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>


        </div>
    )
};


export default ListComponent;
