const Product = require("../../Model/ProductModel")

//show all products API
exports.getproducts = async(req,res)=>{
    //  const products = await Product.find().populate({
    //     path : "Reviews",
    //     populate : {
    //         path : "User_Id",
    //         select : "User_Name User_Email"
    //     }
    //  })
    const products = await Product.find()
    if(products.length == 0){
        res.status(400).json({
            message : "No product Found",
            product : []
        })
    }else{
        res.status(200).json({
            message : "Products Fetched Successfully",
            data : products
        })
    }
}

//show single product API
exports.getproduct = async(req,res)=>{
   const {id} = req.params
   if(!id){
    res.status(400).json({
        message : "Please Provide Id"
    })
   }else{
       const product = await Product.find({_id : id})
    if(product.length ==0){
        res.status(400).json({
            message : "No Product with that ID",
            product : []
        })
    }else{
res.status(200).json({
        message : "Product Fetched Successfully",
        ishan : product
    })
   }
    }
    
}