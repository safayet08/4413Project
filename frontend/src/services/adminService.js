import axios from "axios";
const port = "3333";

const apiUrl = `http://localhost:${port}/api`;

export async function getSalesRecords() {
    const response = await axios.get(apiUrl + "/admin/getSales");
    return response.data;
}
