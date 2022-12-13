// import express package for deploying app
import express from 'express'

// import cartCtrl with all cart routes for backend logic
import cartCtrl from '../controller/cartController.js'

// Cart Route to get cart, add/remove from cart, delete cart item
const router= express.Router()

// create get method for getting cart information
router.get('/getCart', cartCtrl.getCart)

// create post method for adding/removing specific quantity of items to cart
router.post('/addCart', cartCtrl.addCart)

// create delete method for delete a whole cart item from cart
router.delete('/deleteCartItem', cartCtrl.deleteCartItem)

// export route
export default router;