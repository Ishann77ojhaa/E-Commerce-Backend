const { getmyorders, createorder, updateMyOrder, deleteMyOrder, cancelOrder, getOrderById } = require("../../Conroller/User/Order/orderController")
const isAuthenticated = require("../../Middleware/isAuthenticated")
const catchAsync = require("../../Services/catchAsync")

const router = require("express").Router()


router.route("/")
.get(isAuthenticated,catchAsync(getmyorders))
.post(isAuthenticated,catchAsync(createorder))


router.route("/cancel")
.patch(isAuthenticated,catchAsync(cancelOrder))


router.route("/:id")
.patch(isAuthenticated, catchAsync(updateMyOrder))
.delete(isAuthenticated, catchAsync(deleteMyOrder))
.get(isAuthenticated, catchAsync(getOrderById));

module.exports = router