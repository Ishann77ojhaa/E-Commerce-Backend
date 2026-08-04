const Product = require("../../Model/ProductModel")
const Review = require("../../Model/Reviewmodel")

//show all products
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
            data : []
        })
    }else{
        res.status(200).json({
            message : "Products Fetched Successfully",
            data : products
        })
    }
}

//show single product 
exports.getproduct = async(req,res)=>{
   const {id} = req.params
   if(!id){
    res.status(400).json({
        message : "Please Provide Id"
    })
   }else{
       const product = await Product.find({_id : id})
       const productreviews = await Review.find({Product_Id : id}).populate("User_Id")
    if(product.length ==0){
        res.status(400).json({
            message : "No Product with that ID",
            data : [],
            data2 : []
        })
    }else{
res.status(200).json({
        message : "Product Fetched Successfully",
        data :  {product, productreviews}
    })
   }
    }
    
}



//Admin ra User deutaii le use garne API haru ya banaune 