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
    Phone_Number : {type: Number, required: true},
    Order_Status : {
        type : String,
        enum : ['Pending','Delivered','Cancelled','On the Way','Preparing'],
        default : "Pending"
    },
    Payment_Details : {
        pidx : {type : String},
        method : {type : String, enum :['COD','Khalti'], default : 'COD' },
        status : { type : String, enum :['Paid','Unpaid','Pending'],default : "Pending"}
    } 
},{
    timestamps : true
})

const Order = mongoose.model("Order",OrderSchema)
module.exports = Order