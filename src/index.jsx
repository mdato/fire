import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
//import "bootstrap/dist/css/bootstrap.css.map";
//import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';
//import 'react-toastify/dist/react-toastify.cjs.development';
import {ToastContainer} from 'react-toastify';

//import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
    <React.StrictMode>
        <App />
        <ToastContainer />
    </React.StrictMode>, 
    document.getElementById("root")
    );
