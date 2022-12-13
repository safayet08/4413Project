// import cart model that will allow access to the database objects for Cart
import Cart from '../models/cartModel.js'

// this method will find a cart in the database based on a given user id
const getCart = async function(owner) {
    try {
        const cart = await Cart.findOne({ owner: owner }).exec();
        return cart;
    }
    catch (error) {
        throw new Error(error);
    }
}

// this method will create a cart in the database based on given cart data
const createCart = async function(cartData) {
    try {
        const cart = await Cart.create(cartData);
        return cart;
    }
    catch (error) {
        throw new Error(error);
    }
}

// this method will delete a cart in the database based on a given cart id
const deleteCart = async function(id) {
    try {
        const result = await Cart.deleteOne({ owner: id });
        return result;
    }
    catch (error) {
        throw new Error(error);
    }

};

// this method will update a cart in the database based on a given cart
const updateCart = async(updatedCart) => {
    try {
        const cart = await updatedCart.save();
        return cart;
    }
    catch (error) {
        throw new Error(error);
    }
    
}


export default {getCart, createCart, deleteCart, updateCart}