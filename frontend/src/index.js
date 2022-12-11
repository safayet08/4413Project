import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import { createRoot } from "react-dom/client";
import App2 from "./App2";
const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
window.PORT = "5000"

root.render(
    <BrowserRouter>
        <App2 />
    </BrowserRouter>
);

registerServiceWorker();
