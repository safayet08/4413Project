// import user data model for accessing user information in the database
import User from '../models/userModel.js'

// this method will find a user in the database based on given id, refreshToken or email
const getUser = async function(valType, userVal) {

    try {
        let user;
        if (valType == "email") {
            user = await User.findOne({email: userVal}).exec();
        }
        else if (valType == "refreshToken") {
            user = await User.findOne({refreshToken: userVal}).exec();
        }
        else if (valType == "userId") {
            user = await User.findOne({_id: userVal}).exec();
        }

        return user;
    }
    catch(error){
        throw new Error(error);
    }

}

// This method will create a new user in the database based on given user data
const createUser = async(newUser) => {
    try {
        await User.create(newUser);
    }
    catch(error){
        throw new Error(error);
    }
}

// This method will update a users information based on a new updated user model
const updateUser = async(updatedUser) => {
    try {
        await updatedUser.save();
    }
    catch(error){
        throw new Error(error);
    }
}

// This method will delete a user from the database based on given email, refresh token or userId
const deleteUser = async(valType, userVal) => {
    try {
        let user;
        if (valType == "email") {
            user = await User.deleteOne({email: userVal}).exec();
        }
        else if (valType == "refreshToken") {
            user = await User.deleteOne({refreshToken: userVal}).exec();
        }
        else if (valType == "userId") {
            user = await User.deleteOne({_id: userVal}).exec();
        }
    }
    catch(error){
        throw new Error(error);
    }
}

export default {getUser, createUser, updateUser, deleteUser}