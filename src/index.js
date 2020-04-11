import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import publicIp from "public-ip";



const renderReactDom = () => {
    ReactDOM.render(<App />, document.getElementById('root'));
};


const  getIp = async () => {
    await publicIp.v4().then(data => {
        localStorage.setItem("deviceId", data);
    });
}
if (window.cordova) {
    document.addEventListener('deviceready', () => {
        const deviceDetails = document.getElementById('deviceProperties');
        localStorage.setItem("deviceId", deviceDetails.id);
        renderReactDom();
    }, false);
} else {
     getIp();
    renderReactDom();
}
