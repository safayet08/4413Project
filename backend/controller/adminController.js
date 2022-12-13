// import the order Data Access Object in order to make data calls to the order DB
import orderDAO from "../dao/orderDAO.js"

// import the visit Data Access Object in order to make data calls to the user DB
import VisitDAO from "../dao/visitDAO.js";

// This function will get every single data value in the order DB table, parse it
// and transform it into a list of items, the number sold of all time, and the 
// sales value, sorted by most sales value to least sales value.
const getSales = async(req,res)=>{

    //get all sales data
    const data = await orderDAO.getAllOrder();

    // create temporary variables for use in the data transformation step
    let salesData = {};
    let salesFinal = [];
    let newQuantity = 0;
    let newPrice = 0;

    // double for loop, goes through every items list per order, grabs items, adds to new dictionary
    // and will either add new item to dictionary or update current dictionary item with new 
    // quantity sold and sales.
    for (const property of data) {
        for (const items of property.items){
            console.log(items.itemId in salesData)
            if (items.itemId in salesData) {
                newQuantity = items.quantity + salesData[items.itemId].sold
                newPrice = newQuantity * items.price
                salesData[items.itemId] = {"name": items.name, "sold": newQuantity,"price": newPrice }
            }
            else {
            salesData[items.itemId] = {"name": items.name, "sold": items.quantity,"price": items.quantity * items.price }
            }
        }
    }

    // push each value into a new list
    for (const [key, value] of Object.entries(salesData)) {
        salesFinal.push(value)
    }

    // sort from most sales to least sales
    salesFinal.sort(function(a,b) {return parseFloat(b.price) - parseFloat(a.price)} );

    // send list of item sales to frontend
    res.send(salesFinal);
}

const getAppUsage = async(req,res)=>{

    //get all visits data
    const data = await VisitDAO.getAllVisits();

    // create temporary variables for use in the data transformation step
    let visitData = {};
    let visitFinalData =[];


    // loop through every entry and parse data based on date of event, and count each event type
    for (const property of data) {
        const date = property.date
        const eventType = property.visitType
        if (date in visitData) {
            if (eventType == "Home Page") {
                visitData[date].HomePage += 1
            }
            else if (eventType == "Item View") {
                visitData[date].ItemView += 1
            }
            else if (eventType == "Cart Usage") {
                visitData[date].CartAdd += 1
            }
            else if (eventType == "Order") {
                visitData[date].Purchase += 1
            }
        }
        else {
            visitData[date] = {"HomePage": 0, "ItemView": 0, "CartAdd": 0,"Purchase": 0}
            if (eventType == "Home Page") {
                visitData[date].HomePage = 1
            }
            else if (eventType == "Item View") {
                visitData[date].ItemView = 1
            }
            else if (eventType == "Cart Usage") {
                visitData[date].CartAdd = 1
            }
            else if (eventType == "Order") {
                visitData[date].Purchase = 1
            }
            
        }

    }

    // change format into a list of JSON
    for (const [key, value] of Object.entries(visitData)) {
        let newVal = {date: key, HomePage: value.HomePage, ItemView: value.ItemView, CartAdd: value.CartAdd, Purchase: value.Purchase }
        visitFinalData.push(newVal)
    }

    res.send(visitFinalData);

}

export default {getSales, getAppUsage};


