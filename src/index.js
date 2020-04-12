import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import publicIp from "public-ip";



const renderReactDom = () => {
    ReactDOM.render(<App />, document.getElementById('root'));
};


const  getIp = async () => {
    const data = await publicIp.v4();
    localStorage.setItem("deviceId", data);
    return data;
}

if (window.cordova) {
    document.addEventListener('deviceready', () => {
        const deviceDetails = document.getElementById('deviceProperties');
        //localStorage.setItem("deviceId", deviceDetails.id);
        localStorage.setItem("deviceId", "test");
        renderReactDom();
    }, false);
} else {
    getIp().then( 
        (ip) => console.log(ip)
    ).catch( (e) => console.log('Error occured getting device Id') )
    renderReactDom();
}
