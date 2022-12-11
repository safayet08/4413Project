import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import itemRouter from "./routes/itemRoute.js";
import orderRouter from "./routes/orderRoute.js";
import cors from "cors";
import homeRouter from "./routes/homeRoute.js";
import cartRouter from "./routes/cartRoute.js";
import adminRouter from "./routes/adminRoute.js";
import cookieparser from "cookie-parser";
import JWTVerify from "./middleware/JWTVerify.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import config from "./config/config.js";
dotenv.config();
connectDB();
const app = express();
app.use(cors({ credentials: true, origin: true }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieparser());
app.use("/api/user", userRouter);
app.use("/api/item", itemRouter);
app.use("/api/cart", cartRouter);
app.use("/api/home", homeRouter);
app.use("/api/admin", adminRouter);
// uncomment the below once we connect the backend and frontend
//app.use(JWTVerify.verifyJWT);
app.use("/api/order", orderRouter);
app.use(notFound);
app.use(errorHandler);
// this should be moved below verifyJWT
//const PORT = process.env.PORT || 5000;

app.listen(
    config.PORT,
    console.log(
        `Server Running in ${config.NODE_ENV} mode on port ${config.PORT}`
    )
);

// remove this when merging, store locally until we are ready to use in final product.
// const server = https.createServer(
//     {
//         key: fs.readFileSync("./backend/key.pem"),
//         cert: fs.readFileSync("./backend/cert.pem")

//     },app
// ).listen(5443, (req, res) => console.log(`Server running on port ${5443}`));

//server
