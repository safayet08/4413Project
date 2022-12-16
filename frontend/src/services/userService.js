import axios from "axios";

import { port } from "./frontEndConfig";
const API_URL = window.location.protocol+"//"+window.location.hostname+ ":5000"+"/api";

export async function registerService(fullName, email, password) {
    return await axios.post(`${API_URL}/user/addUser`, {
        Name: fullName,
        Username: email,
        Password: password,
    });
}

export async function loginService(email, password) {
    return await axios.post(`${API_URL}/user/login`, {
        Username: email,
        Password: password,
    });
}

export async function logoutService() {
    return await axios.get(`${API_URL}/user/logout`, {
        withCredentials: true,
    });
}

export async function getRefreshToken() {
    axios.defaults.withCredentials = true;
    return await axios.post(`${API_URL}/home`, {
        withCredentials: true,
        credentials: "include",
    });
}
