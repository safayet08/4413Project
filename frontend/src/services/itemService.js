import axios from "axios";
import { port } from "./frontEndConfig";

const apiUrl = `http://localhost:${port}/api/item`;
const apiEndpoint = `${apiUrl}/items`;

function itemUrl(id) {
    return `${apiEndpoint}/${id}`;
}

export async function getItems(filterCategory, filterQuery) {
    const bestSellerRoute = "/get/filter";
    // console.log("filterCategory: " + filterCategory)
    // console.log("filterQuery: " + filterQuery)
    console.log(apiUrl + bestSellerRoute);
    const body = {
        colname: filterCategory,
        searchString: filterQuery,
    };
    const response = await axios.post(
        apiUrl + bestSellerRoute,
        body,
        {
            headers: {
                Accept: "application/json",
                "Access-Control-Allow-Origin": true,
            },
        },

        { params: { trophies: true } }
    );
    console.log(response.data.data);
    return response.data.data;
}
export async function getItem(itemId) {
    const itemRoute = `/${itemId}`;
    console.log(apiUrl + itemRoute);
    const response = await axios.get(apiUrl + itemRoute);

    return response.data;
}

export async function postReview(itemId, reviews) {
    const itemRoute = `/addReview`;
    const rating= reviews.rating;
    const comment= reviews.rating;
    const user= reviews.user
    const type=reviews.type

    const body={
        review:{
            rating: rating,
            comment:comment,
            user:user,
            type:type
        }, 
        itemId:itemId,
    }
    console.log(apiUrl + itemRoute);
    const response = await axios.post(apiUrl + itemRoute, body);

    return response.data;
}
