import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import publicIp from "public-ip";

const cordova = window.cordova;

const renderReactDom = () => {
    ReactDOM.render(<App />, document.getElementById('root'));
};


const  getIp = async () => {
    const data = await publicIp.v4();
    localStorage.setItem("deviceId", data);
    return data;
};

if (window.cordova) {
    document.addEventListener('deviceready', () => {
        const permissions = cordova.plugins.permissions;
        permissions.requestPermission(permissions.ACCESS_FINE_LOCATION, (iderd) => console.log("Permission provided"), () => console.log("Permission not prov"));
        const cordovaDevice = window.device;
        localStorage.setItem("deviceId", cordovaDevice.uuid);
        renderReactDom();
    }, false);
} else {
    getIp().then( 
        (ip) => console.log(ip)
    ).catch( (e) => console.log('Error occured getting device Id') );
    renderReactDom();
}
