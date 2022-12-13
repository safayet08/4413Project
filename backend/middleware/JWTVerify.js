// import json web token package for verifying given access token
import jwt from 'jsonwebtoken'
// import user DAO in order to access user information
import UserDAO from "../dao/UserDAO.js";

// This middleware function will verify the jwt access token sent when placing an order
const verifyJWT = async (req, res, next) => {

    // parse authentication header
    const authHeader = req.headers.authorization || req.headers.Authorization;

    // if no header with Bearer in it, then user in unauthorized
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);

    // get access token
    const token = authHeader.split(' ')[1];

    // get refresh token cookie
    const cookies = req.cookies;

    // if no cookie, not allowed on site
    if (!cookies?.jwt) return res.sendStatus(401);

    // get refresh Token from cookie
    const refreshToken = cookies.jwt;

    // find user in the database based on given username
    const foundUser = await UserDAO.getUser("refreshToken", refreshToken);

    // if no found user, not authorized
    if (!foundUser) return res.sendStatus(401); //Unauthorized

    // verify the access token to ensure the user is allowed to place an order
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            foundUser.name = decoded.UserInfo.name;
            foundUser.email = decoded.UserInfo.email;
            foundUser.roles = "user";
            next();
        }
    );
}

export default {verifyJWT}