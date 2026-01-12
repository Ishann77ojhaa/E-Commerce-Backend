const bcrypt = require('bcryptjs')
const User = require('./Model/UserModel')
// Admin seeding

//check if admin is already there or not 

const AdminSeeding = async() => {
   const isadminExists = await User.findOne({user_Email : "admin@gmail.com"})
    if(!isadminExists){
                await  User.create({
                    user_Email : "admin@gmail.com",
                    user_Password : bcrypt.hashSync("admin",10),
                    user_Role : "Admin",
                    user_Name : "admin",
                    user_Phone : "980000000"
                   })
            console.log("Admin Seeded Successfully")
    } else {
        console.log("Admin already seeded")
    }
    }
module.exports = AdminSeeding