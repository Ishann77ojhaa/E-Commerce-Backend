const { initiateKhaltiPayment, verifyPidx } = require("../../Conroller/User/Payment/paymentController")
const isAuthenticated = require("../../Middleware/isAuthenticated")
const catchAsync = require("../../Services/catchAsync")

const router = require("express").Router()

router.route("/")
.post(isAuthenticated,catchAsync(initiateKhaltiPayment))

router.route("/success")
.get(catchAsync(verifyPidx))


module.exports = router