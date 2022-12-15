import axios from "axios";

import { port } from "./frontEndConfig";
const API_URL = `http://localhost:${port}/api/user`;

export async function registerService(fullName, email, password) {
    return await axios.post(`${API_URL}/addUser`, {
        Name: fullName,
        Username: email,
        Password: password,
    });
}

export async function loginService(email, password) {
    return await axios.post(`${API_URL}/login`, {
        Username: email,
        Password: password,
    });
}

export async function logoutService() {
    return await axios.post(`${API_URL}/logout`);
}
