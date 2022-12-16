import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import ReactDOM from "react-dom/client";
import App2 from "./App2";

const root = ReactDOM.createRoot(document.getElementById("root"));
window.PORT = "3333";

root.render(
    <BrowserRouter>
        <App2 />
    </BrowserRouter>
);

registerServiceWorker();
