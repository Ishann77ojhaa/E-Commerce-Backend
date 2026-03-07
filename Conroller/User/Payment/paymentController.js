const { default: axios} = require("axios")
const Order = require("../../../Model/OrderSchema")

exports.initiateKhaltiPayment = async(req,res)=>{
    try{
    const {orderId,amount} = req.body

if(!orderId || !amount){
    return res.status(400).json({
        message : "Please Provide OrderId and Amount"
    })
}

//order search
let order = await Order.findById(orderId)
if(!order){
    return res.status(404).json({
        message : "Order not Found with that id"
    })
}

//Check if already paid
 if (order.Payment_Details.status === "Paid") {
   return res.status(400).json({
      message: "Payment already completed for this order"
   })
}

// check if coming amount is equal as total amount 
if(order.Total_Amount !== Number(amount)){
    return res.status(400).json({
        message : "Amount must be equal to total amount"
    })
}

const data = {
    return_url : "http://localhost:2000/api/payment/success",
    website_url : "http://localhost:2000",
    amount : Number(amount) * 100,
    purchase_order_id : orderId,
    purchase_order_name : "orderName_" + orderId
}
 const response = await axios.post("https://dev.khalti.com/api/v2/epayment/initiate/",data,{
    headers : {
         'Authorization' : "Key e2d3540a11fb40eaa00d77d528edcd2d"
    }
 })
  order.Payment_Details.pidx = response.data.pidx
  await order.save()

  res.status(200).json({
    payment_url : response.data.payment_url
  })
}
 catch(err){
    console.log(err)
    res.status(400).json({
        message : "Payment initialion Failed"
    })
 }
}

exports.verifyPidx = async(req,res)=>{
    try{
        const app = require("./../../../app")
        const io = app.getSocketIO()
    const { pidx } = req.query

   const response =  await axios.post("https://dev.khalti.com/api/v2/epayment/lookup/",{pidx},{
    headers : {
        'Authorization' : "Key e2d3540a11fb40eaa00d77d528edcd2d"
    }
   })
const order = await Order.findOne({'Payment_Details.pidx' : pidx})

if(!order){
    return res.redirect("/errorPage")
  }

if(response.data.status == 'Completed'){

  order.Payment_Details.method = 'Khalti'
  order.Payment_Details.status = 'Paid'
  await order.save()

//get socket.id of requesting user
io.on("connection",(socket)=>{
    // console.log(socket)
    io.to(socket.id).emit("payment",{message : "Payment Successfully"})
   })

    //notify to frontend
    res.redirect("http://localhost:2000")
    io.emit("payment",{ message : "Payment Successfull"})
    // res.redirect("http://localhost:2000")
   }else{
    io.on("connection",(socket)=>{
    io.to(socket.id).emit("payment",{message : "Payment error"})
    }) 


    //notify error to frontend
    // io.emit("payment",{ message : "Payment Failed"})
    //    res.redirect("http://localhost:2000/errorPage")
    res.redirect("http://localhost:2000/errorPage")
   }
}
catch(err){
 return res.status(500).json({
    message : "Failed!!"
 })
}
}