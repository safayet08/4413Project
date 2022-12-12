// import express package for deploying app
import express from "express";

// import adminController with all admin routes for backend logic
import adminController from '../controller/adminController.js'

// initialize the route in the backend
const router=express.Router()

// create get method api call for access all sales data
router.get('/getSales', adminController.getSales)

// create get method api call for access all visit data
router.get('/getVisits', adminController.getAppUsage)

// export route
export default router;