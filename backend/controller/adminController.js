import orderDAO from "../dao/orderDAO.js"
import cartDAO from "../dao/cartDAO.js"
import userDAO from "../dao/userDAO.js"

const getSales = async(req,res)=>{

    //get all sales data, but transform it into per item.
    const data = await orderDAO.getAllOrder();

    let salesData = {};
    let salesFinal = [];
    let newQuantity = 0;
    let newPrice = 0;

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

    for (const [key, value] of Object.entries(salesData)) {
        salesFinal.push(value)
    }

    console.log(salesFinal)

    salesFinal.sort(function(a,b) {return parseFloat(b.price) - parseFloat(a.price)} );

    res.send(salesFinal);
}

export default {getSales};


