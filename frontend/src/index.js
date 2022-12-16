import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import ReactDOM from 'react-dom';
import App2 from "./App2";


ReactDOM.render(
    <BrowserRouter>
        <App2 />
    </BrowserRouter>,
    document.getElementById("root")
);

registerServiceWorker();
