const { createReview, getProductReview, deleteReview, addProductReview } = require("../Conroller/User/UserController")
const isAuthenticated = require("../Middleware/isAuthenticated")
const catchAsync = require("../Services/catchAsync")

const router = require("express").Router()

// router.route("/reviews")

router.route("/reviews/:id")
.get(getProductReview)
.delete(deleteReview)
.post(isAuthenticated,catchAsync(createReview))


module.exports = router