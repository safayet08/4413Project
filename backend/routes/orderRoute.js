// import express package for deploying app
import express from "express";

// import orderController with all order routes for backend logic
import orderController from '../controller/orderController.js'

// initialize the route in the backend
const router=express.Router()

// create post method for placing an order
router.post('/placeOrder', orderController.placeOrder)

//export route
export default router;