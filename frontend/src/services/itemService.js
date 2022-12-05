import http from "./httpService";
//import { apiUrl } from "../config.json";

const apiUrl = "http://localhost:3900/api/items";
const apiEndpoint = `${apiUrl}/items`;

function itemUrl(id) {
    return `${apiEndpoint}/${id}`;
}

export function getItems() {
    return http.get(apiEndpoint);
}
export function getItem(itemId) {
    return http.get(itemUrl(itemId));
}
