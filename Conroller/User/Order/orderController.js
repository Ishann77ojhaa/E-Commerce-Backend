const Order = require("../../../Model/OrderSchema")

//Creating or placing an Order
exports.createorder = async(req,res)=>{
    const userid = req.user.id
 const {shipping_address, items, total_amount, payment_details, phone_number} = req.body
if(!shipping_address || !items || items.length == 0 || !total_amount || !payment_details || !phone_number){
    return res.status(400).json({
        message : "Please Provide all the details asked"
    })    
}
  
  //Insert Into Orders
 const createdOrder = await Order.create({
    user : userid,
    Items : items,
    Total_Amount : total_amount,
    Shipping_Address : shipping_address,
    Payment_Details : payment_details,
    Phone_Number : phone_number

 });

 res.status(200).json({
    message : "Order Placed Successfully",
    data : createdOrder
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

//Update Order
exports.updateMyOrder = async(req,res)=>{
    const userid = req.user.id
    const {id} = req.params
    const {shipping_address, items} = req.body
if(!shipping_address || !items){
    return res.status(400).json({
        message : "Please Provide ShippingAddress and Items"
    })
}
    //get order of above id
     const existingOrder = await Order.findById(id)
 if(!existingOrder){
    return res.status(400).json({
        message : "No Order with that id"
    })
 }
 //check if the user who is trying to update made this order or not 
   if(existingOrder.user !== userid){
     return res.status(400).json({
        message : "You cannot do this"
     })
   }

  if(existingOrder.Order_Status == "On the Way"){
    return res.status(400).json({
        message : "You cannot Update now!!"
    })
  }
const updatedOrder =  await Order.findByIdAndUpdate(id,{
   Shipping_Address : shipping_address,
   Items : items
},{
    new : true
})

 res.status(200).json({
    message : "Order Updated SuccessFully",
    data : updatedOrder
})
}

//Delete Order
exports.deleteMyOrder = async(req,res)=>{
    const userid = req.user.id
    const {orderid} = req.params

    //check if order exists or not
    const order = await Order.findById(orderid)
    if(!order){
        return res.status(200).json({
            message : "No Order With that id"
        })
    }
    //check if the user who is trying to Delete made this order or not
    if(order.user !==userid){
        return res.status(400).json({
            message : "You Don't have permission to do this"
        })
    }
        await Order.findByIdAndDelete(orderid)
        res.json(200).json({
            message : "Order Deleted SuccessFully",
            data : null
        })
    }

//change Status
exports.cancelOrder = async(req,res)=>{
    const {orderid} = req.params
    const userid = req.user.id
    // const {status} = req.body

    //check if order exists or not
    const order = await Order.findById(orderid)
    if(!order){
        return res.status(200).json({
            message : "No Order With that id"
        })
    }

    //check if the user who is trying to Delete made this order or not
    if(order.user !==userid){
        return res.status(400).json({
            message : "You Don't have permission to do this"
        })
    }
    if(order.Order_Status !== "Pending"){
        return res.status(400).json({
            message : "You Can't do this now"
        })
    }
 const updatedOrder =  await Order.findByIdAndUpdate(orderid,{
     Order_Status : "Cancelled"
  },{
    new : true
  })
  res.status(200).json({
    message : "Order Cancelled SuccessFully",
    data : updatedOrder
  })
}