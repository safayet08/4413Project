import jwt from 'jsonwebtoken'
import UserDAO from "../dao/UserDAO.js";

const verifyJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    console.log(token)

    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(401);

    const refreshToken = cookies.jwt;

    const foundUser = await UserDAO.getUser("refreshToken", refreshToken);

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