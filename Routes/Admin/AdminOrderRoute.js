const { getallorders, getSingleOrder, deleteOrder, updateOrderStatus } = require("../../Conroller/Admin/Order/ordercontroller")
const isAuthenticated = require("../../Middleware/isAuthenticated")
const restrictTo = require("../../Middleware/restrictTo")
const catchAsync = require("../../Services/catchAsync")

const router = require("express").Router()


router.route("/")
.get(isAuthenticated, restrictTo("Admin") ,catchAsync(getallorders))



router.route("/:id")
.get(isAuthenticated,restrictTo("Admin"),catchAsync(getSingleOrder))
.patch(isAuthenticated,restrictTo("Admin"),catchAsync(updateOrderStatus))
.delete(isAuthenticated,restrictTo("Admin"),catchAsync(deleteOrder))


module.exports = router