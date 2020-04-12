import React from 'react';
import BottomNavigation from "@material-ui/core/BottomNavigation/index";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction/index";
import {Link} from "react-router-dom";
import {DeveloperBoard, LocationOn, TrendingUp} from "@material-ui/icons";
import "../../styles/navbar.css"

const NavBar = () => {

    const [value, setValue] = React.useState(1);

    const routes = [ {
        path: "/feeds",
        label: "Feeds",
        component: <TrendingUp />
    }, {
        path: "/hotspots",
        label: "HotSpots",
        component: <LocationOn />
    },{
        path: "/lookup",
        label: "LookUp Case",
        component: <DeveloperBoard />
    }];

    return (
            <BottomNavigation value={value} className={"_navbar"} showLabels onChange={(event, newValue) => {
                setValue(newValue);
        }}>
                {routes.map((route, key) => <BottomNavigationAction key={key} label={route.label} component={Link} to={route.path} className={"_navitem"} icon={route.component} />)}
            </BottomNavigation>
    )
};

export default NavBar;
