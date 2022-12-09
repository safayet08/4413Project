import express from "express";
import * as orderController from "../controller/orderController.js"

const router=express.Router()


router.get("/",(req,res)=>{

        res.send("YOO")
    }
)


export default router