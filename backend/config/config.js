import dotenv from "dotenv";
dotenv.config();

// set up different environment variables to be accessible throughout entire backend
const NODE_ENV = process.env.NODE_ENV;

const PORT = process.env.PORT;

const MONGO_URI = process.env.MONGO_URI;

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

// export all variables
export default{
    NODE_ENV,
    PORT,
    MONGO_URI,  
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET
};