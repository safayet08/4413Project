// import the user Data Access Object in order to make data calls to the user DB
import UserDAO from "../dao/UserDAO.js";

// import the item Data Access Object in order to make data calls to the item DB
import Item from '../models/itemModel.js'

// import the cart Data Access Object in order to make data calls to the cart DB
import CartDAO from '../dao/cartDAO.js'
import cartDAO from "../dao/cartDAO.js";

// This function will get the refresh token from the cookie, and use that to look
// up whether that use has a cart, and if so, send it back to persist.
const getCart = async(req, res) => {
    // get cookie from request
    const cookies = req.cookies;

    // if no cookie, then send back 204 no content error
    if (!cookies?.jwt) return res.sendStatus(204); //No content

    // get refreshtoken from jwt cookie
    const refreshToken = cookies.jwt;

    // find the user attached to the refresh token
    const owner= await UserDAO.getUser( "refreshToken", refreshToken)

    // if user is not found, then clear cookie and send no-content back
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None'});
        return res.sendStatus(204);
    }

    // find the cart attached to the user id 
    const cart = await CartDAO.getCart(owner._id);

    // if no cart, then return 204 error and do not persist cart in front end
    if(!cart) {
        return res.status(204).json({ 'message': `User ID ${refreshToken} not found` });
    }

    // return cart that was found
    res.json(cart)
}

// This function will add/ remove a certain amount of an item to/from a pre-existing cart
// or create a brand new cart for a user that does not have one and add the item to it.
const addCart = async(req, res) => { 
    
    // get cookie from request
    const cookies = req.cookies;

    // if no cookie, then send back 204 no content error
    if (!cookies?.jwt) return res.sendStatus(204); //No content

    // get refreshtoken from jwt cookie
    const refreshToken = cookies.jwt;

    // find the user attached to the refresh token
    const foundUser = await UserDAO.getUser( "refreshToken", refreshToken)

    // if user is not found, then clear cookie and send no-content back
    if (!foundUser) {
        //res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None'});
        return res.sendStatus(204);
    }

    // get user id of found user
    const owner = foundUser._id;

    // get itemID from reqeust body
    const itemId = req.body.itemId;

    // get quantity of item from reqeust body
    const quantity = req.body.quantity;

    // try to add/remove a item to/from cart, if no cart, create new cart
    try {

        // find cart based on the user id from the refresh token
        const cart = await CartDAO.getCart(owner);

        // find the item based on the item id from the request body
        const item = await Item.findById(itemId);

        // if no item, return 404 error saying no item found
        if (!item) {
            res.status(404).send({ message: "item not found" });
            return;
        }
        
        // get the price of item
        const price = item.price;

        // get the name of the item
        const name = item.name;

        //If cart already exists for user, add/remove that item from it.
        if (cart) {

            // try and see if the item already exists in the cart
            const itemIndex = cart.items.findIndex((item) => item.name ==  name);
            
            // if item does appear in the cart, add quantity to already existing item in cart
            if (itemIndex > -1) {
                let product = cart.items[itemIndex];
                product.quantity += quantity;
                cart.bill = cart.items.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price;
                },0)
                    cart.items[itemIndex] = product;
                    cart.items= cart.items.filter(item=> item.quantity>0)


                cart = cartDAO.updateCart(cart)
                res.status(200).send(cart);
            } 
            // if item does not appear, add brand new entry to items in cart
            else 
            {
                cart.items.push({ itemId, name, quantity, price });
                cart.bill = cart.items.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price;
                },0)
                cart = cartDAO.updateCart(cart)
                res.status(200).send(cart);
            }
        } 
        // if no cart existed for this person, create cart data and send to DB and to frontend
        else 
        {
            //no cart exists, create one
            const newCartData= {
                owner:owner,
                items: [{ itemId, name, quantity, price }],
                bill: quantity * price,
            }

            const newCart = await CartDAO.createCart(newCartData)

            return res.status(201).send(newCart);
        }
    } 
    catch (error) 
    {
       console.log(error);
       res.status(500).send("something went wrong");
    }
}

// This function will remove a whole item from a cart, instead of simply decrementing an item.
const deleteCartItem = async (req, res) => {
    
    // get cookie from request
    const cookies = req.cookies;

    // if no cookie, then send back 204 no content error
    if (!cookies?.jwt) return res.sendStatus(204); //No content

    // get refreshtoken from jwt cookie
    const refreshToken = cookies.jwt;

    // find the user attached to the refresh token
    const foundUser = await UserDAO.getUser( "refreshToken", refreshToken)

    // if user is not found, then clear cookie and send no-content back
    if (!foundUser) {
        //res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None'});
        return res.sendStatus(204);
    }

    // get user id of found user
    const owner = foundUser._id;

    // get itemID from reqeust body
    const itemId = req.body.itemId;

    // find the cart, and then remove item from cart unless not found, then send back 404 error
    try 
    {
        // find cart based on the user id from the refresh token
        const cart = await CartDAO.getCart(owner);

        // if cart is not found, return 404 error
        if (!cart) {
            res.status(404).send({ message: "cart not found" });
            return;
        }
       
        // see if item is in fact in the cart
        const itemIndex = cart.items.findIndex((item) => item._id == itemId);
        
        // if item does appear in the cart, remove from cart completely
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
            cart = cartDAO.updateCart(cart)
            res.status(200).send(cart);
        } 
        // if item is not even in cart, return 404 error.
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

export default {getCart, addCart, deleteCartItem}