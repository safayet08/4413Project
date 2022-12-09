import express, { json } from 'express'
import Item from '../models/itemModel.js'
import  '../controller/ItemController.js'
import * as ItemController from '../controller/ItemController.js'

const router= express.Router()


router.get("/:id", ItemController.getItemFromBackend)
router.put("/addItem",ItemController.createItem)
router.post("/updateItem",ItemController.updateItem)
router.post("/addReview",ItemController.addReview)
router.get("/get/averageRating",ItemController.averageRatings)
router.get("/get/numReviews",ItemController.getNumReviews)
router.post("/removeReview",ItemController.removeReview)
router.get("/get/bestSellers", ItemController.getBestSellersFromBackend)
router.delete("/deleteItem",ItemController.deleteItem)
export default router;