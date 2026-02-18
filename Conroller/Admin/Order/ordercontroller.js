const Order = require("../../../Model/OrderSchema")

//Get all of orders
exports.getallorders = async(req,res)=>{
    
    const orders = await Order.find().populate({
        path : "Items.product",
        model : "Product"
    })
    res.status(200).json({
        message : "Orders Fetched Successfully",
        data : orders
    })
}