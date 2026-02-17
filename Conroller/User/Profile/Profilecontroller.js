const User = require("../../../Model/UserModel")
const bcrypt = require("bcryptjs")


//Get My Profile Controller
exports.getmyprofile = async(req,res)=>{
    const userid = req.user.id
    const myprofile = await User.findById(userid)
  
    //send response
      res.status(200).json({
        data : myprofile,
        message : "Profile Fteched Successfully"
      })
}


//Update My Profile
exports.updatemyprofile = async(req,res)=>{
    const {user_name, user_email, user_phone} = req.body
    const userid = req.user.id

  const updateddata =  await User.findByIdAndUpdate(userid,{
        user_Email : user_email,
        user_Name : user_name,
        user_Phone : user_phone    
},{
    runValidators : true,
    new : true
})
   res.status(200).json({
   message : "Profile Updated Successfully",
   data : updateddata
   })
}


//Delete My Profile
exports.deletemyprofile = async(req,res)=>{
    const userid = req.user.id
    await User.findByIdAndDelete(userid)

    res.status(200).json({
        messag : "Profile Deleted Successfully",
        data : null
    })
}

//Change My Password
exports.updatemypassword = async(req,res)=>{
    const userid = req.user.id
    const {oldpass,newpass,confirmpass} = req.body

    if(!oldpass || !newpass || !confirmpass){
        return res.status(400).json({
            message : "Please Provide all details asked"
        })
    }

    if(newpass !== confirmpass){
        return res.status(400).json({
            message : "Password Doesn't match"
        })
    }

    const usrdata = await User.findById(userid)
    const hashedoldpass = usrdata.user_Password

    //check if oldpass is correct or not
 const isoldpasscorrect = bcrypt.compareSync(oldpass,hashedoldpass)
 if(!isoldpasscorrect){
    return res.status(400).json({
        message : "Password Doesn't Match"
    })
 }
   
 //if matched then
 usrdata.user_Password = bcrypt.hashSync(newpass,10)
await usrdata.save()

 res.status(200).json({
    message : "Password Changed Successfully"
 })
  
}