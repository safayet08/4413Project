// import order data model for accessing order information in the database
import Order from "../models/orderModel.js"

// this method will find an order in the database based on a given order id
export const getOrder= async(req,res)=>{
    try{
        const orderId= req.body.orderId
        const orderFromServer= await Order.findById(orderId)
        return orderFromServer
    }catch(error){
        throw new Error(error);
    }
}

// this method will create an order in the database based on given order data
const createOrder = async function(orderData) {
    try {
        const order = await Order.create(orderData);
        return order;
    }
    catch(error){
        throw new Error(error);
    }
}

// this method will get all order data in the DB and return it
const getAllOrder = async function() {
    try {
        const orders = await Order.find({});
        return orders;
    }
    catch(error){
        throw new Error(error);
    }

}

export default {getOrder, createOrder, getAllOrder}


