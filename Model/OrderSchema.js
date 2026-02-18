const mongoose = require("mongoose")
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    Items : [{
        quantity : {type : Number, required : true},
        product : {type : mongoose.Schema.Types.ObjectId, ref : "Product",required : true}
    }],
    Total_Amount : {type:Number, required : true},
    Shipping_Address : {type : String, required : true},
    Order_Status : {
        type : String,
        enum : ['Pending','Delivered','Cancelled','On the Way','Preparing'],
        default : "Pending"
    },
    Payment_Details : {
        method : {type : String, enum :['COD','Khalti']},
        status : { type : String, enum :['Paid','Unpaid','Pending'],default : "pending"}
    } 
},{
    timestamps : true
})

const Order = mongoose.model("Order",OrderSchema)
module.exports = Order