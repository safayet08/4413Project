import express from 'express'
import dotenv from'dotenv'
import connectDB from './config/db.js'
import userRouter from "./routes/userRoute.js"
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
dotenv.config()
connectDB()
const app=express()

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use("/api/user",userRouter)
app.use(notFound)
app.use(errorHandler)
const PORT=process.env.PORT || 5000

app.listen(PORT, console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`))
