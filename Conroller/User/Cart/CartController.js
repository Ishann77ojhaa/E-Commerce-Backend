const Product = require("../../../Model/ProductModel")
const User = require("../../../Model/UserModel")


//Add To Cart
exports.addToCart = async(req,res)=>{
    const userid = req.user.id
    const { productid } = req.params
if(!productid){
    return res.status(400).json({
        message : "Please Provide ProductId"
    })
}
const productexists = await Product.findById(productid)
if(!productexists){
    return res.status(200).json({
        message : "Product Doesn't Exists"
    })
}


  const user = await User.findById(userid)

  if (!user) {
    return res.status(404).json({ message: "User Not Found" })
  }

  user.Cart.push(productid)
   await user.save()
   res.status(200).json({
    message : "Product Added To Cart"
   })
}

//Get Card Items
exports.getMyCart = async(req,res)=>{
    const userid = req.user.id
    const userdata = await User.findById(userid).populate({
        path : "Cart",
        select : "-Product_Status"
    })
    res.status(200).json({
        messsage : "Cart Item Fetched SuccessFully",
        data : userdata.Cart
    })
    
}

//Delete Items From Cart
exports.deleteitemfromcart = async(req,res)=>{
    const {productid} = req.params
    // const {productids} = req.body
   const userid = req.user.id
//check if product exists or not
const product = await Product.findById(productid)
if(!product){
    return res.status(400).json({
        message : "No Product With that ProductId"
    })
}

   //get user cart
   const user = await User.findById(userid)
   user.Cart = user.Cart.filter(pId=>pId != productid)
//    productids.forEach(productIdd=>{
//    user.Cart = user.Cart.filter(pId=>pId != productidd)   // [1,2,3]==> 2 ==> filter ==>[1,3] ==> user.cart =[1,3]
//     })
  await user.save()
   res.status(200).json({
    message : "Items Removed From cart"
   })

}