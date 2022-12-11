import express from "express";
import adminController from '../controller/adminController.js'

const router=express.Router()

router.get('/getSales', adminController.getSales)

export default router;