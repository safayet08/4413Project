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


