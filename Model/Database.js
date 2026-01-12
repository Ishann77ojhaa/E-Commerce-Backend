const mongoose = require("mongoose")
const User = require("./UserModel")
const bcrypt = require("bcryptjs")
const AdminSeeding = require("../AdminSeeding")

 exports.Connectdatabase = async() => {
    
        try{
            await mongoose.connect(process.env.MONGO_URL)
        console.log("Database connection successfull")
        }
    
        catch(error){
            console.log("Database Connection Failed",error)
        }

        AdminSeeding()
    }




