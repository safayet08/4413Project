import mongoose from 'mongoose'

// Create user schema in mongoose
/* 
The user schema will include the following things:
1. name - name of the given user
2. email - the email/username a user will use to login
3. password - the hashed password that will be used for logging in
4. type - type of user, either browser, user, or admin
5. refreshToken - token used to identify user with frontend and backend
*/
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      default: "user",
    },
    
    refreshToken: String
  },
  {
    timestamps: true,
  }
)
const User = mongoose.model('User', userSchema)

export default User