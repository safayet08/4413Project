import http from "./httpService";
//import { apiUrl } from "../config.json";
import axios from "axios";
const port = "5000";

const apiUrl = `http://localhost:${port}/api/item`;
const apiEndpoint = `${apiUrl}/items`;

function itemUrl(id) {
    return `${apiEndpoint}/${id}`;
}

export async function getItems(filterCategory,filterQuery) {
    const bestSellerRoute = "/get/filter";
    // console.log("filterCategory: " + filterCategory)
    // console.log("filterQuery: " + filterQuery)    
    console.log(apiUrl + bestSellerRoute)
    const body={
            "colname":filterCategory,
            "searchString":filterQuery
        }
    const response = await axios.post(apiUrl + bestSellerRoute, 
      body ,{
        headers: {
            Accept: "application/json",
            "Access-Control-Allow-Origin": true,
        }},

       { params: { trophies: true }},
    );
    console.log(response.data.data)
    return response.data.data;
}
export async function getItem(itemId) {
    const itemRoute = `/${itemId}`;
    console.log(apiUrl + itemRoute)
    const response = await axios.get(apiUrl + itemRoute);

    return response.data;
}
