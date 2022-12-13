// import express package for deploying app
import express from 'express'

// import UserCtrl with all user routes for backend logic
import UserCtrl from '../controller/userController.js'

// User Route to access user data, log users in, sign users up
const router= express.Router()

// create get method that will get user info for front end
router.get('/getUser', UserCtrl.getUser)

// create post method for registaring a new user
router.post('/addUser', UserCtrl.createNewUser)

// create post method for logging in a new user
router.post('/login', UserCtrl.loginUser)

// create a get method for getting a new access token based on a refresh token
router.get('/refresh', UserCtrl.handleRefreshToken)

// create a get method that will logout a user.
router.get('/logout', UserCtrl.handleLogout)
    
export default router;