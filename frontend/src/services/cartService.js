import axios from "axios";

import { port } from "./frontEndConfig";
const CART_API_URL = `http://localhost:${port}/api/cart`;

export async function getCart() {
    return await axios.get(`${CART_API_URL}/getCart`, {
        withCredentials: "true",
    });
}

export async function addToCart(body, headers) {
    console.log(body)
    return await axios.post(`${CART_API_URL}/addCart`, {
        body,
        headers,
    });
}

export async function addToID(body, headers) {
    return await axios.post(`${CART_API_URL}/addCart`, {
        body,
        headers,
    });
}
