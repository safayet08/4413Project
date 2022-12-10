import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Checkout from "./pages/checkout";
import Home from "./pages/home";
import NavBar from "./components/navbar";
import NotFound from "./components/notFound";
import LoginForm from "./pages/loginForm";
import RegisterForm from "./pages/registerForm";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Item from "./pages/item";
import CartProvider from "./components/cartContext";
import cookie from "react-cookie";
import jscookie from "js-cookie";

import axios from "axios";

class App extends Component {
    componentDidMount() {
        const port = "5000";
        const apiUrl = `http://localhost:${port}/api/home`;
        console.log(apiUrl)
        const f = async () => {
            axios.defaults.withCredentials = true;
            const response = await axios.post(apiUrl, {
                withCredentials: true,
                credentials: "include",
            });
            console.log(response.data);
        };

        f();

        const jwtcookie = { jwt: jscookie.get("jwt") };
        console.log("-->" + jwtcookie.jwt);
    }

    render() {
        return (
            <CartProvider>
                <ToastContainer />
                <NavBar />
                <main className="container">
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route path="/register" element={<RegisterForm />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/item/:_id" element={<Item />} />
                        <Route path="/not-found" element={<NotFound />} />
                        <Route path="/checkout" element={<Checkout />} />
                    </Routes>
                </main>
            </CartProvider>
        );
    }
}

export default App;
