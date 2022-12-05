import React, { Component } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/home";
import NavBar from "./components/navbar";
import NotFound from "./components/notFound";
import LoginForm from "./pages/loginForm";
import RegisterForm from "./components/registerForm";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <ToastContainer />
                <NavBar />
                <main className="container">
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route path="/register" element={<RegisterForm />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/not-found" element={<NotFound />} />
                    </Routes>
                </main>
            </React.Fragment>
        );
    }
}

export default App;
