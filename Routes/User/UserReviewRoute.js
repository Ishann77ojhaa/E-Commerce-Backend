const { getmyreviews, deleteReview, createReview } = require("../../Conroller/User/Reviews/ReviewController")
const isAuthenticated = require("../../Middleware/isAuthenticated")
const catchAsync = require("../../Services/catchAsync")

const router = require("express").Router()

router.route("/")
.get(isAuthenticated,catchAsync(getmyreviews))


router.route("/:id")
// .get(getProductReview)
.delete(deleteReview)
.post(isAuthenticated,catchAsync(createReview))



module.exports = router