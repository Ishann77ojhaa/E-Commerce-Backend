const User = require("../../../Model/UserModel")

exports.getUsers = async(req,res)=>{
    const users = await User.find().select("-__v")
if(users.length > 1){
    return res.status(200).json({
        message : "Users Fetches Successfully",
        data : users
    })
}
res.status(400).json({
    message : "User Collection is empty",
    data : []
})
}