import express from 'express'
import Cart from '../models/cartModel.js'

const getCart = async function(owner) {
    const cart = await Cart.findOne({ owner: owner }).exec();
    return cart;
}


const createCart = async function(cartData) {
    const cart = await Cart.create(cartData);
    return cart;
}

const deleteCart = async function(id) {
    const result = await Cart.deleteOne({ owner: id });
    return result;
}



export default {getCart, createCart,deleteCart}