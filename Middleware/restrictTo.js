const restrictTo = (...roles)=>{
    return (req,res,next)=>{
        const user_role = req.user.user_Role
        
    if(!roles.includes(user_role)){
        res.status(400).json({
            message : "You don't have the permission"
        })
    }else{
        next()
    }
    }
}

module.exports = restrictTo