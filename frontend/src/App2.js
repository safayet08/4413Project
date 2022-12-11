import React, { Component } from "react";
import { useEffect,useState ,useContext} from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import jwtDecode from "jwt-decode";
import Checkout from "./pages/checkout";
import Home from "./pages/home";
import NavBar from "./components/navbar";
import NotFound from "./components/notFound";
import LoginForm from "./pages/loginForm";
import RegisterForm from "./pages/registerForm";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Item from "./pages/item";
import { CartContext } from "./components/cartContext";
import CartProvider from "./components/cartContext";
import axios from "axios";

const App2 = () => {
  const port = "5000";
    const [user, setUser]= useState([])
    const cartContext = useContext(CartContext)
  const getRefreshToken = async () => {
      const apiUrl = `http://localhost:${port}/api/home`;
      axios.defaults.withCredentials = true;
      const response = await axios.post(apiUrl, {
          withCredentials: true,
          credentials: "include",
      });
    // console.log(response.data);
  };
  const getUserCart = async ()=>{
    cartContext.getCartFromServer()

  }

  useEffect(()=>{
    getRefreshToken();
    // const jwtRefreshcookie = { jwt: jscookie.get("jwt") };
    // console.log("-->" + jwtRefreshcookie.jwt);

    try {
        const accessToken = localStorage.getItem("accToken");
        // console.log(" access token " +accessToken)
        const user = jwtDecode(accessToken).UserInfo;
        setUser(user)
        // console.log(user);
    } catch (ex) {
        console.log("no access token");
    }

    getUserCart()
  },[])

  const changeUser= (user)=>{
    setUser(user)
  }


  return (
    <CartProvider>
        <ToastContainer />
        <NavBar user={user} changeUser={changeUser}/>
        <main className="container">
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route  path="/search" element={<Home />} />
                
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/item/:_id" element={<Item />} />
                <Route path="/not-found" element={<NotFound />} />
                <Route path="/checkout" element={<Checkout />} />
            </Routes>
        </main>
    </CartProvider>
);
};

export default App2;
