const { loginUser, registerUser, forgotpassword, VerifyOTP, ResetPassword } = require("../Conroller/Authentication/AuthController")
const catchAsync = require("../Services/catchAsync")

const router = require("express").Router()

router.route("/register").post(catchAsync(registerUser))
router.route("/login").post(catchAsync(loginUser))
router.route("/forgotpassword").post(catchAsync(forgotpassword))
router.route("/verifyotp").post(catchAsync(VerifyOTP))
router.route("/resetpassword").post(catchAsync(ResetPassword))

module.exports = router
