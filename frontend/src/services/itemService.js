import http from "./httpService";
//import { apiUrl } from "../config.json";
import axios from "axios";
const port = "5000";

const apiUrl = `http://localhost:${port}/api/item`;
const apiEndpoint = `${apiUrl}/items`;

function itemUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export async function getItems() {
  const bestSellerRoute = "/get/bestSellers";
  const response = await axios.get(apiUrl + bestSellerRoute, {
    headers: {
      Accept: "application/json",
      "Access-Control-Allow-Origin": true,
    },
    params: { trophies: true },
  });
  // console.log(response.data)
  return response.data;
}
export async function  getItem(itemId) {
    const itemRoute= `/${itemId}`;
    const response = await axios.get(apiUrl+itemRoute)

    return response.data
}
