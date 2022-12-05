import express, { json } from 'express'
import Item from '../models/itemModel.js'

const router= express.Router()

router.get('/all', async(req,res)=>{
    const items = await Item.find({})
    res.json(items)
})

router.get(`/:id`, async(req,res)=>{
    const items = await Item.findById(req.params.id)
    res.json(items)
})


router.post('/search/', async(req,res)=>{

})


router.post('/addReview', async(req,res)=>{
    const itemId= req.body.itemId

    const review = req.body.review
    try{
        const itemFromDb= await Item.findById(itemId)
    }catch(error){
        res.status(404)
        throw new Error ("Error fetching item")
    }
})

router.post('/updateItem',async(req,res)=>{
    const itemId= req.body.itemId
    const updatedBody=req.body.update


    try{
        const response= await Item.findByIdAndUpdate(itemId,updatedBody)
        res.json(`Updated ${response}`)
    }catch(error){
        res.status(404)
        throw new Error("Error Updating Item")
    }
})

router.put('/addItem', async(req,res)=>{
    const newItem= req.body.item;


    try{
        await Item.create(newItem)
        res.json("Inserted")
    }catch(error){
        res.status(404)
        res.json(error)

    }
})

export default router;