// import the order Data Access Object in order to make data calls to the order DB
import orderDAO from "../dao/orderDAO.js"

// import the cart Data Access Object in order to make data calls to the cart DB
import cartDAO from "../dao/cartDAO.js"

// import the user Data Access Object in order to make data calls to the user DB
import userDAO from "../dao/userDAO.js"

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

export default {getSales};


