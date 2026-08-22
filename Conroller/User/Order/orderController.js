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

// Get single order by ID
exports.getOrderById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const order = await Order.findOne({
      _id: id,
      user: userId,
    }).populate({
      path: "Items.product",
      model: "Product",
      select: "-Product_StockQTY -Product_Status -createdAt -updatedAt -__v",
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
        data: null,
      });
    }

    res.status(200).json({
      message: "Order fetched successfully",
      data: order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch order",
      error: error.message,
    });
  }
};

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
exports.updateMyOrder = async (req, res) => {
    const userid = req.user.id;
    const { id } = req.params;
    const { shipping_address } = req.body;

    if (!shipping_address || !shipping_address.trim()) {
        return res.status(400).json({
            message: "Please provide shipping address"
        });
    }

    const existingOrder = await Order.findById(id);

    if (!existingOrder) {
        return res.status(404).json({
            message: "No order with that id"
        });
    }

    // Check ownership
    if (existingOrder.user.toString() !== userid.toString()) {
        return res.status(403).json({
            message: "You cannot do this"
        });
    }

    // Only pending orders can be edited
    if (existingOrder.Order_Status !== "Pending") {
        return res.status(400).json({
            message: "You cannot update this order now"
        });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
        id,
        {
            Shipping_Address: shipping_address.trim()
        },
        {
            returnDocument: "after"
        }
    );

    res.status(200).json({
        message: "Shipping address updated successfully",
        data: updatedOrder
    });
};

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
if (order.user.toString() !== userid.toString()) {
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

    const order = await Order.findOne({
        _id: orderid,
        user: userid
})
    if(!order){
        return res.status(200).json({
            message : "Order Not Found"
        })
    }

    //check if the user who is trying to Delete made this order or not
   if (order.user.toString() !== userid.toString()) {
    return res.status(400).json({
        message: "You Don't have permission to do this"
    });
}
    if(order.Order_Status !== "Pending"){
        return res.status(400).json({
            message : "You Can't do this now"
        })
    }
 const updatedOrder =  await Order.findByIdAndUpdate(orderid,{
     Order_Status : "Cancelled"
  },{
    returnDocument: "after"
  })
  res.status(200).json({
    message : "Order Cancelled SuccessFully",
    data : updatedOrder
  })
}