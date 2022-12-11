import Order from "../models/orderModel.js"

export const getOrder= async(req,res)=>{
    try{
        const orderId= req.body.orderId
        const orderFromServer= await Order.findById(orderId)
        return orderFromServer
    }catch(error){
        throw new Error(error);
    }
}

const createOrder = async function(orderData) {
    const order = await Order.create(orderData);
    return order;
}

const getAllOrder = async function() {
    const orders = await Order.find({});
    return orders;

}

export default {getOrder, createOrder, getAllOrder}


