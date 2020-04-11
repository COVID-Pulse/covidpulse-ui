import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const renderReactDom = () => {
    ReactDOM.render(<App />, document.getElementById('root'));
};

if (window.cordova) {
    document.addEventListener('deviceready', () => {
        renderReactDom();
    }, false);
} else {
    renderReactDom();
}
