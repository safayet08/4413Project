import express from 'express'
import User from '../models/userModel.js'
// User Route to access user data, log users in, sign users up etc etc
const router= express.Router()
router.get('/getUser', async(req,res)=>{
  const response=await User.findOne({"email":req.query.email})
  return response
})

router.post('/addUser', async(req,res)=>{
    const reqbody= req.body
    console.log(reqbody)

    const newUser= {
        name:reqbody.Name,
        password:reqbody.Password,
        email:reqbody.Email,
        isAdmin:false,
    }
    try {
        await User.create(newUser);
        console.log("Done");
        res.send("DONE");
      } catch (err) {

        console.log(err);
        res.send(err);
      }
    }
    )
    
export default router;