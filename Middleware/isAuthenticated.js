const jwt = require("jsonwebtoken")
const {promisify} = require("util")
const User = require("../Model/UserModel")


const isAuthenticated = async(req,res,next)=>{
const token = req.headers.authorization

if(!token){
   res.status(400).json({
        message : "Please Send Token"
    })
}else{
    // jwt.verify(token, process.env.SECRET_KEY, (err,success)=>{
    //      if(err){
    //        return res.status(400).json({
    //             message : "Invalid Token"
    //         })
    //      }
    //         req.User = success,
    //         next()
    //      }
    // )
//Alternative
try {
    const decoded = await promisify(jwt.verify)(token,process.env.SECRET_KEY)
    const doesUserExist =  await User.findOne({_id : decoded.id})

   if(!doesUserExist){
    return res.status(404).json({
        message : "User doesn't exists with that token/id"
    })
   }

   req.user  = doesUserExist

   next()
  } 
  catch (error) {
    res.status(400).json({
        message : error.message
    })

}
}
}
module.exports = isAuthenticated

