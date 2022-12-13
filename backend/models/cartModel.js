import mongoose from 'mongoose'

// Create cart schema in mongoose
/* 
The cart schema will include the following things:
1. owner - this is a objectID associated with a user ObjectId in the user table
2. items - this is an item list of all the current intems in the cart, including 
itemid, name, quantity and price
3. bill - the current bill associated with the order
*/
const cartSchema = new mongoose.Schema({
    owner : {
       type: mongoose.Schema.Types.ObjectId,
       required: true,
       ref: 'User'
     },
    items: [{
      itemId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Item',
       required: true
    },
    name: String,
    quantity: {
       type: Number,
       required: true,
       min: 1,
       default: 1},
       price: Number
     }],
    bill: {
        type: Number,
        required: true,
       default: 0
      }
    },
    {
    timestamps: true,
})

const Cart = mongoose.model('Cart', cartSchema)

export default Cart
