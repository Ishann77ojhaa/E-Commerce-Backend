const { addToCart, getMyCart, deleteitemfromcart } = require("../../Conroller/User/Cart/CartController")
const isAuthenticated = require("../../Middleware/isAuthenticated")
const catchAsync = require("../../Services/catchAsync")

const router = require("express").Router()

router.route("/")
.get(isAuthenticated,catchAsync(getMyCart))


router.route("/:productid")
.post(isAuthenticated,catchAsync(addToCart))
.delete(isAuthenticated,catchAsync(deleteitemfromcart))


module.exports = router