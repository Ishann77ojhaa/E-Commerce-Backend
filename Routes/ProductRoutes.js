
const { CreateProduct } = require("../Conroller/Admin/Product/productcontroller")
const isAuthenticated = require("../Middleware/isAuthenticated")
const restrictTo = require("../Middleware/restrictTo")
const Product = require("../Model/ProductModel")
const {multer, storage } = require("../Middleware/MulterConfig")
const Upload = multer({storage : storage})
const router = require("express").Router()

router.route("/createproduct").post(isAuthenticated, restrictTo("Admin"), Upload.single('productImage') ,CreateProduct)

module.exports = router