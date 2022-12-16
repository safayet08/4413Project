// import the order Data Access Object in order to make data calls to the order DB
import orderDAO from "../dao/orderDAO.js"

// import the cart Data Access Object in order to make data calls to the cart DB
import cartDAO from "../dao/cartDAO.js"

// import the user Data Access Object in order to make data calls to the user DB
import userDAO from "../dao/UserDAO.js"

// import the visit Data Access Object in order to make data calls to the user DB
import VisitDAO from "../dao/visitDAO.js";

// This function will place an order for a logged in user based on the cart in the DB
const placeOrder = async(req,res)=>{

    // get cookie from request
    const cookies = req.cookies;

    // if no cookie, then send back 204 no content error
    if (!cookies?.jwt) return res.sendStatus(204); //No content

    // get refreshtoken from jwt cookie
    const refreshToken = cookies.jwt;

    // find the user attached to the refresh token
    const foundUser = await userDAO.getUser( "refreshToken", refreshToken)

    // if user is not found, then clear cookie and send no-content back
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None'});
        return res.sendStatus(204);
}

    // get the user_id from the user
    const owner = foundUser._id;
    
    // attempt to get cart from database, get items from cart, and create new order that will be persisted in DB
    try{

        // find cart attached to user id
        const cart = await cartDAO.getCart(owner);

        // if cart is not found, return 404 error
        if (!cart) {
            res.status(404).send({ message: "cart not found" });
            return;
        }

        // create new order data to be send to DB
        const newOrderData= {
            owner: owner,
            items: cart.items,
            bill: cart.bill,
            address: req.body.address
        }

        // attempt to verify credit card numer - to add

        // celete cart in the DB
        const result = await cartDAO.deleteCart(owner);

        // if cart is deleted, then send the new order through and send a 201 status back
        if (result.deletedCount == 1) {

            const order = orderDAO.createOrder(newOrderData);

            // increment order count in visit table
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();
            today = mm + '/' + dd + '/' + yyyy;
            const visit = await VisitDAO.getVisit(today, req.ip, "Order")
            if (visit.length === 0) {
                const newVisitInfo = {
                    date: today,
                    ipAddress: req.ip,
                    visitType: "Order"
                };
                await VisitDAO.createVisit(newVisitInfo)
            }

            res.status(201).json({ success: `Order completed!` });
        }
        // if cart was not found, do not place order
        else 
        {
            res.status(404).send("cart not found, no order placed");
        }
        
    }
    catch(error){
        console.log(error);
        res.status(500).send("something went wrong");
    }
};

export default {placeOrder};


