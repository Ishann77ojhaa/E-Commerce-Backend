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
    website_url : "http://localhost:5173",
    amount : Number(amount) * 100,
    purchase_order_id : orderId,
    purchase_order_name : "orderName_" + orderId
}
 const response = await axios.post("https://dev.khalti.com/api/v2/epayment/initiate/",data,{
    headers : {
         'Authorization' : "Key dbeb7a0894d84237b2f11e1bd976b128"
    }
 })
  order.Payment_Details.pidx = response.data.pidx
  await order.save()

  res.status(200).json({
    payment_url : response.data.payment_url
  })
}
 catch (err) {
  console.log("Khalti Error:");
  console.log(err.response?.data);
  console.log(err.response?.status);
  console.log(err.message);

  return res.status(400).json({
    message: "Payment initiation Failed",
    error: err.response?.data || err.message,
  });
}
}

exports.verifyPidx = async(req,res)=>{
    try{

    const { pidx } = req.query;

   const response =  await axios.post("https://dev.khalti.com/api/v2/epayment/lookup/",{pidx},{
    headers : {
        'Authorization' : `Key ${process.env.API_KEY}`
    }
   });
const order = await Order.findOne({'Payment_Details.pidx' : pidx})

if(!order){
    return res.redirect("http://localhost:5173/errorPage")
  }

if(response.data.status === 'Completed'){

  order.Payment_Details.method = 'Khalti'
  order.Payment_Details.status = 'Paid'
  await order.save();


//notify to frontend
return res.redirect(
  `http://localhost:5173/order-success/${order._id}`
);
}
return res.redirect("http://localhost:5173/errorPage")
}catch (err) {
    console.log("VERIFY ERROR");
    console.log(err);
    console.log(err.response?.data);
    console.log(err.message);

    return res.status(500).json({
        message: "Failed!!",
        error: err.message
    });
}
}