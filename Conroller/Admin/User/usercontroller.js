const User = require("../../../Model/UserModel")


//Get All Users One place except Admin
exports.getUsers = async(req,res)=>{
    const userid = req.user.id
    const users = await User.find({_id : {$ne : userid}}).select("-__v")
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

//Delete User- API
exports.deleteuser = async(req,res) =>{
const userid = req.params.id
if(!userid){
    return res.status(400).json({
        message : "Please Provide ID"
    })
}
 const user = await User.findById(userid)
 if(!user){
    return res.status(400).json({
        message : "User Not found with that ID"
    })
 }
   await User.findByIdAndDelete(userid)
   res.status(200).json({
    message : "Id deleted Successfully"
   })
}
