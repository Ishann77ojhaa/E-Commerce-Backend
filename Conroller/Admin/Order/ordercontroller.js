const Order = require("../../../Model/OrderSchema")

//Get all of orders
exports.getallorders = async(req,res)=>{
    const orders = await Order.find().populate({
        path : "Items.product",
        model : "Product"
    }).populate({
        path: "user",
        model: "User"
    })
    res.status(200).json({
        message : "Orders Fetched Successfully",
        data : orders
    })
}

//get Single Order
exports.getSingleOrder = async(req,res)=>{
    const {id} = req.params

    //check if order exists or not
    const order = await Order.findById(id).populate({
    path: "Items.product",
    model: "Product"
});
    if(!order){
        return res.status(200).json({
            message : "No order with that id"
        })
    }

res.status(200).json({
    message : "Order Fetched SuccessFully",
    data : order
})
}

//update Order Status
exports.updateOrderStatus = async(req,res)=>{
    const {id} = req.params
    const {orderstatus} = req.body

const validStatuses = [
    "Pending",
    "Delivered",
    "Cancelled",
    "On the Way",
    "Preparing"
];

if (!validStatuses.includes(orderstatus)) {
    return res.status(400).json({
        message: "Invalid order status or status hasn't been provided"
    });
}
     
    //check if order exists or not
    const order = await Order.findById(id)
    if(!order){
        return res.status(200).json({
            message : "No order with that id"
        })
    }

  const updatedData =   await Order.findByIdAndUpdate(id,{
        Order_Status : orderstatus
    },{
        new : true
    })
   res.status(200).json({
    message : "Order Status Updated Successfully",
    data : updatedData
   })
}

//delete order
exports.deleteOrder = async(req,res)=>{
    const {id} = req.params

     //check if order exists or not
    const order = await Order.findById(id)
    if(!order){
        return res.status(200).json({
            message : "No order with that id"
        })
    }
  await Order.findByIdAndDelete(id)
  res.status(200).json({
    message : "Deleted SuccessFully",
    data : null
  })
}