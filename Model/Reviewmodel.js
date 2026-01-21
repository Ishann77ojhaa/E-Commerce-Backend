const mongoose = require("mongoose")
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    User_Id:{
        type : Schema.Types.ObjectId,
        ref : "User",
        required : [true, "A review must belong to user"]
    },
    Product_Id:{
        type : Schema.Types.ObjectId,
        ref : "Product",
        required : [true,"A review must be of product"]
    },
    Rating:{
        type : Number,
        default : 3
    },
    Message:{
        type : String,
        required : true
    }
})

const Review = mongoose.model("Review",reviewSchema)
module.exports = Review