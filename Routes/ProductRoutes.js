
const { CreateProduct } = require("../Conroller/Admin/Product/productcontroller")
const isAuthenticated = require("../Middleware/isAuthenticated")
const restrictTo = require("../Middleware/restrictTo")
const Product = require("../Model/ProductModel")

const router = require("express").Router()

router.route("/createproduct").post(isAuthenticated, restrictTo("Admin") ,CreateProduct)

module.exports = router