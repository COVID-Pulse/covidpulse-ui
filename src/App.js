/* global google */
import React from 'react';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';
import './App.css';
import NavBar from "./components/containers/NavBar";
import LookUp from "./components/containers/LookUp";
import Report from "./components/containers/Report";
import Hotspots from "./components/containers/HotSpots";
import Feeds from "./components/containers/Feeds";
import { ThemeProvider } from '@material-ui/core';
import { theme } from './configs/theme-provider';

const google = window.google;

function App() {
  return (
      <ThemeProvider theme={theme}>
        <Router>
            <div className="app">
                <Route path="/feeds" component={Feeds} />
                <Route path="/hotspots" component={Hotspots} />
                <Route path="/report" component={Report} />
                <Route path="/loopkup" component={LookUp} />
                <Redirect from={"/"} to={"/loopkup"}/>
                <NavBar/>
            </div>
        </Router>
        </ThemeProvider>
  );
}

export default App;
