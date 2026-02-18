const { getmyorders, createorder } = require("../../Conroller/User/Order/orderController")
const isAuthenticated = require("../../Middleware/isAuthenticated")
const catchAsync = require("../../Services/catchAsync")

const router = require("express").Router()


router.route("/")
.get(isAuthenticated,catchAsync(getmyorders))
.post(isAuthenticated,catchAsync(createorder))

module.exports = router