// import mongoose package which allows us to connect to a MongoDB for storing data
import  mongoose  from "mongoose";

// this asynchronous function will try and connect to the DB based on the environment variable set
// in the .env file
const connectDB=async()=>{
    try{
        const conn= await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true,
        })
        

        console.log(`MongoDB Connected ${conn.connection.host}`)
    }catch(error){
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
}

// export to connectDB variable
export default connectDB
