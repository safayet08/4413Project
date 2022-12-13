import mongoose from 'mongoose'

// Create visit schema in mongoose
/* 
The cart schema will include the following things:
1. data - the date associated with the event happening
2. ipAddress - the ipAddress that made that event occur
itemid, name, quantity and price
3. visitType - the type of visit "Home Page", "Item View", "Cart Add", "Purchase"
*/
const visitSchema = new mongoose.Schema({
    date : {
       type: String,
       required: true
    },
    ipAddress : {
        type: String,
        required: true
    },
    visitType : {
        type: String,
        required: true
    }}
    ,
    {
    timestamps: true,
})

const Visit = mongoose.model('Visit', visitSchema)

export default Visit