const { addToCart, getMyCart, deleteitemfromcart, increaseQuantity, decreaseQuantity } = require("../../Conroller/User/Cart/CartController")
const isAuthenticated = require("../../Middleware/isAuthenticated")
const catchAsync = require("../../Services/catchAsync")

const router = require("express").Router()

router.route("/")
.get(isAuthenticated,catchAsync(getMyCart))


router.route("/:productid")
.post(isAuthenticated,catchAsync(addToCart))
.delete(isAuthenticated,catchAsync(deleteitemfromcart))

router.patch("/:productid/increase", isAuthenticated, catchAsync(increaseQuantity))
router.patch("/:productid/decrease", isAuthenticated, catchAsync(decreaseQuantity))

module.exports = router