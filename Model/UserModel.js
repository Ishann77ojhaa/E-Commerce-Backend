const mongoose = require("mongoose")
// const schema = mongoose.schema
const Userschema = new mongoose.Schema({

    user_Email:{
        type : String,
        required : [true,"Email is Must"],
        unique : true,
        lowercase : true
    },
    user_Phone:{
        type : Number,
        required : [true,"Phone is must"]
    },
    user_Name:{
        type : String,
        required : [true,"Username is must"]
    },
    user_Password:{
        type : String,
        required : [true,"Password is must"],
        select : false
    },
    user_Role:{
        type: String,
        enum : ["Customer","Admin"],
        default : "Customer"
    },
    OTP:{
         type : Number,
         select : false
    },
    isOTPVerified:{
        type : Boolean,
        default : false,
        select : false
    }
})

const User = mongoose.model("User",Userschema)

module.exports = User

