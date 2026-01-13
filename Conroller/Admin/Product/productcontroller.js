const Product = require("../../../Model/ProductModel")


exports.CreateProduct = async (req,res)=>{
    try{
     const file = req.file
    let filepath
if(!file){
    filepath = "https://static.vecteezy.com/system/resources/thumbnails/057/068/323/small/single-fresh-red-strawberry-on-table-green-background-food-fruit-sweet-macro-juicy-plant-image-photo.jpg"
}else{
    filepath = file.filename
}
    const {Product_name, Product_description, Product_price, Product_stockQTY, Product_status} = req.body

    if(!Product_name|| !Product_description || !Product_price || !Product_stockQTY || !Product_status){
        return res.status(400).json({
            message : "Please Enter Product_name, Product_description, Product_price, Product_stockQTY, Product_status"
        })
    }

   await Product.create({
        Product_Name : Product_name,
        Product_Description : Product_description,
        Product_Price : Product_price,
        Product_StockQTY : Product_stockQTY,
        Product_Status : Product_status,
        Product_Image : "localhost:2000/" + filepath
    })
    res.status(200).json({
        message : "Product Created Successfully"
    })
}catch(err){
           res.status(500).json({
            message : "Something Went Wrong"
           })
    }
}


//show all products
exports.getproducts = async(req,res)=>{
     const products = await Product.find()
    if(products.length == 0){
        res.status(400).json({
            message : "No product Found",
            product : []
        })
    }else{
        res.status(200).json({
            message : "Products Fetched Successfully",
            ishan : products
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

