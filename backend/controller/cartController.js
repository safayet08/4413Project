import express from 'express'
import Cart from '../models/cartModel.js'
import User from '../models/userModel.js'
import UserDAO from "../dao/UserDAO.js";
import Item from '../models/itemModel.js'
import CartDAO from '../dao/cartDAO.js'

const getCart = async(req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content

    const refreshToken = cookies.jwt;
    const owner= await UserDAO.getUser( "refreshToken", refreshToken)
    const cart = await CartDAO.getCart(owner._id);
    if(!cart) {
        return res.status(204).json({ 'message': `User ID ${refreshToken} not found` });
    }
    res.json(cart)
}

const addCart = async(req, res) => { 
    const cookies = req.cookies;
    
    if (!cookies?.jwt) return res.sendStatus(204); //No content

    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken }).exec();

    if (!foundUser) {
        //res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None'});
        return res.sendStatus(204);
    }

    const owner = foundUser._id;

    // console.log(owner)

    const itemId = req.body.itemId;
    // console.log(req.body)

    const quantity = req.body.quantity;

    try {
        const cart = await CartDAO.getCart(owner);
        const item = await Item.findById(itemId);
        if (!item) {
            res.status(404).send({ message: "item not found" });
            return;
        }

        const price = item.price;
        // console.log(item)
        const name = item.name;
        // const itemId = item._id
        //If cart already exists for user,
        if (cart) {
            const itemIndex = cart.items.findIndex((item) => item.itemId ==  itemId);
            //check if product exists or not
            if (itemIndex > -1) {
                let product = cart.items[itemIndex];
                product.quantity += quantity;
                cart.bill = cart.items.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price;
                },0)
                    cart.items[itemIndex] = product;
                    cart.items= cart.items.filter(item=> item.quantity>0)


                await cart.save();
                res.status(200).send(cart);
            } 
            else 
            {
                cart.items.push({ itemId, name, quantity, price });
                cart.bill = cart.items.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price;
                },0)
                await cart.save();
                res.status(200).send(cart);
            }
        } 
        else 
        {
            //no cart exists, create one
            const newCartData= {
                owner:owner,
                items: [{ itemId, name, quantity, price }],
                bill: quantity * price,
            }
            // console.log(newCartData)
            const newCart = await CartDAO.createCart(newCartData)
            /*const newCart = await Cart.create({
                owner,
                items: [{ itemId, name, quantity, price }],
                bill: quantity * price,
            });*/
            return res.status(201).send(newCart);
        }
    } 
    catch (error) 
    {
       console.log(error);
       res.status(500).send("something went wrong");
    }
}

const deleteCartItem = async (req, res) => {
    
    const cookies = req.cookies;
    
    if (!cookies?.jwt) return res.sendStatus(204); //No content

    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken }).exec();

    if (!foundUser) {
        //res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None'});
        return res.sendStatus(204);
    }
    
    const owner = foundUser._id;
    
    const itemId = req.body.itemId;
    
    try 
    {
        let cart = await Cart.findOne({ owner:owner });
        const itemIndex = cart.items.findIndex((item) => item._id == itemId);
        if (itemIndex > -1) {
            let item = cart.items[itemIndex];
            cart.bill -= item.quantity * item.price;
            if(cart.bill < 0) {
                cart.bill = 0
            }
            cart.items.splice(itemIndex, 1);
            cart.bill = cart.items.reduce((acc, curr) => {
                return acc + curr.quantity * curr.price;
            },0)
            cart = await cart.save();
            res.status(200).send(cart);
        } 
        else 
        {
            res.status(404).send("item not found");
        }
    } 
    catch (error) 
    {
       console.log(error);
       res.status(400).send();
    }
};

const deleteCart = async (req, res) => {
    
    const cookies = req.cookies;
    
    if (!cookies?.jwt) return res.sendStatus(204); //No content

    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken }).exec();

    if (!foundUser) {
        //res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None'});
        return res.sendStatus(204);
    }
    
    const owner = foundUser._id;
    
    try 
    {
        const result = await Cart.deleteOne({ owner });
        if (result.deletedCount == 1) {
            res.sendStatus(200);
        }
        else 
        {
            res.status(404).send("cart not found");
        }
    } 
    catch (error) 
    {
       console.log(error);
       res.status(400).send();
    }
};

export default {getCart, addCart, deleteCartItem, deleteCart}