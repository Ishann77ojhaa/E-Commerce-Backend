const Product = require("../../../Model/ProductModel")


exports.CreateProduct = async (req,res)=>{
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
}

