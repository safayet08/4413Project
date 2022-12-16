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

export async function postReview(itemId, reviews, identifier, type) {
    const itemRoute = `/addReview`;
    const body = {
        review: reviews,
        itemId: itemId,
        userId: identifier,
        type: type,
    };
    console.log(apiUrl + itemRoute);
    const response = await axios.post(apiUrl + itemRoute, body);

    return response.data;
}
