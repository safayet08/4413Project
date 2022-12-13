import mongoose, { Mongoose } from "mongoose";

// Create order schema in mongoose
/* 
The order schema will include the following things:
1. owner - this is a objectID associated with a user ObjectId in the user table
2. items - this is an item list of all the current intems in the cart, including 
itemid, name, quantity and price
3. bill - the current bill associated with the order
4. address - address associated with the order
*/
const orderSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  items: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: true,
      },
      name: String,
      quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
      },
      price: Number,
    },
  ],
  bill: {
    type: Number,
    required: true,
    default: 0,
  },
  address: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
