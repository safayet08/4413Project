// import express package for deploying app
import express from "express";

// import dotenv package for leveraging .env files in our backend
import dotenv from "dotenv";

// import cors package for cross origin resource sharing to relax security applied to our api.
import cors from "cors";

// import cookie-parser package for enabling cookie creation, manipulation, etc 
import cookieparser from "cookie-parser";

// import db config file to initialize MongoDB connection
import connectDB from "./config/db.js";

// import user route file with all relevant user API calls 
import userRouter from "./routes/userRoute.js";

// import item route file with all relevant item API calls
import itemRouter from "./routes/itemRoute.js";

// import order route file with all relevant order API calls
import orderRouter from "./routes/orderRoute.js";

// import home route file with all relevant home API calls
import homeRouter from "./routes/homeRoute.js";

// import cart route file with all relevant cart API calls
import cartRouter from "./routes/cartRoute.js";

// import admin route with all relevant admin API calls
import adminRouter from "./routes/adminRoute.js";

// import JWT verification middleware to check for access token verification
import JWTVerify from "./middleware/JWTVerify.js";

// import error handler middleware
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// import config file for variables to use across the project
import config from "./config/config.js";
import { dirname,join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);


console.log(join(__dirname,"..","frontend"))
// configure dotenv package based on dotenv file.
dotenv.config();

// connect to Mongo DB
connectDB();


// initialize backend server using express
const app = express();

// set proxy to trusted, so ipAddress will be sent
app.set('trust proxy', true)

// set the application to allow for credentials to be passed and allow request origin
app.use(cors({ credentials: true, origin: true }));

// use the urlencoded option in express to allow urlencoded parameters passed through api calls
app.use(express.urlencoded({ extended: false }));

// use json when sharing data 
app.use(express.json());

// initialize the cookie parser package
app.use(cookieparser());

// set up user route with the URL /api/user
app.use("/api/user", userRouter);

// set up item route with the URL /api/item
app.use("/api/item", itemRouter);

// set up cart route with the URL /api/cart
app.use("/api/cart", cartRouter);

// set up home route with the URL /api/home
app.use("/api/home", homeRouter);

// set up admin route with the URL /api/admin
app.use("/api/admin", adminRouter);

// uncomment the below once we connect the backend and frontend
// sets up JWT authentication middleware for when an order is placed, verify is user logged in
app.use(JWTVerify.verifyJWT);

// set up order route with URL /api/order
app.use("/api/order", orderRouter);

// set up not found error middleware
app.use(notFound);

// set up error handle middleware
app.use(errorHandler);

//const PORT = process.env.PORT || 5000;

// initialize the application, set backend port to config.js file specified port
console.log("CONFIG PORT->", config.PORT)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(join(__dirname, "client", "build", "index.html"));
  });
}

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
