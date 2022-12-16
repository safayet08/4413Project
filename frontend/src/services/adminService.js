import axios from "axios";
import { port } from "./frontEndConfig";

const apiUrl = window.location.protocol+"//"+window.location.hostname+ ":3333"+"/api";

export async function getSalesRecords() {
    const response = await axios.get(apiUrl + "/admin/getSales");
    return response.data;
}

export async function getVisitTable() {
    const response = await axios.get(apiUrl + "/admin/getVisits");
    return response.data;
}
