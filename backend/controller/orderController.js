import orderDAO from "../dao/orderDAO.js"
import cartDAO from "../dao/cartDAO.js"
import userDAO from "../dao/userDAO.js"


const placeOrder = async(req,res)=>{
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await userDAO.getUser("refreshToken", refreshToken);

    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        //res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None'});
        return res.sendStatus(204);
    }

    const owner = foundUser._id;
    
    try{

        const cart = await cartDAO.getCart(owner);

        const newOrderData= {
            owner: owner,
            items: cart.items,
            bill: cart.bill,
            address: req.body.address
        }

        const result = await cartDAO.deleteCart(owner);
        if (result.deletedCount == 1) {
            const order = orderDAO.createOrder(newOrderData);
            res.status(201).json({ success: `Order completed!` });
        }
        else 
        {
            res.status(404).send("order placed, cart not found");
        }
        
    }
    catch(error){
        console.log(error);
        res.status(500).send("something went wrong");
    }
};

export default {placeOrder};


