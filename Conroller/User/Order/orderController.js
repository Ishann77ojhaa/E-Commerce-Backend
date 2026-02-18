const Order = require("../../../Model/OrderSchema")

//Creating or placing an Order
exports.createorder = async(req,res)=>{
    const userid = req.user.id
 const {shipping_address, items, total_amount, payment_details} = req.body
if(!shipping_address || !items || !items.length == 0 || !total_amount || !payment_details){
    return res.status(400).json({
        message : "Please Provide all the deatils asked"
    })    
}
  
  //Insert Into Orders
 await Order.create({
    user : userid,
    Items : items,
    Total_Amount : total_amount,
    Shipping_Address : shipping_address,
    Payment_Details : payment_details

 })

 res.status(200).json({
    message : "Order Placed Successfully"
 })
}

//Get all of my orders
exports.getmyorders = async(req,res)=>{
    const userid = req.user.id
    const orders = await Order.find({user : userid}).populate({
        path : "Items.product",
        model : "Product",
        select : "-Product_StockQTY -Product_Status -createdAt -updatedAt -__v"
    })

if(orders.length == 0){
    return res.status(400).json({
        message : "No orders",
        data : []
    })
}
    res.status(200).json({
        message : "Orders Fetched Successfully",
        data : orders
    })
}