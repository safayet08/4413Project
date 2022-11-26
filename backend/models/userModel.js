import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const cartSchema = new mongoose.Schema({
    owner : {
      type: mongoose.Schema.Types.ObjectId,
       required: true,
       ref: 'User'
     },
    // items: [{
    //   itemId: {
    //    type: mongoose.Schema.Types.ObjectId,
    //    ref: 'Item',
    //    required: true
    // },
    // name: String,
    // quantity: {
    //    type: Number,
    //    required: true,
    //    min: 1,
    //    default: 1},
    //    price: Number
    //  }],
    // bill: {
    //     type: Number,
    //     required: true,
    //    default: 0
    //   }
    // }    
   
    },
    {
        timestamps: true,
    })

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
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    recentCart:{cartSchema}
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  // Email and password validation code
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User