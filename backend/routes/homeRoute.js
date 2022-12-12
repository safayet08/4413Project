// import express package for deploying app
import express from "express";

// import homeController with all home routes for backend logic
import homeController from "../controller/homeController.js";

// User Route to access user data, log users in, sign users up etc etc
const router = express.Router();

// This should check and see if refresh token already exists, if so, try and find a
// user with it in DB.
router.post("/", homeController.enterSite) 

export default router;
