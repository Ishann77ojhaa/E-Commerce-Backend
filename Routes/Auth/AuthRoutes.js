const { loginUser, registerUser, forgotpassword, VerifyOTP, ResetPassword, getMe } = require("../../Conroller/Authentication/AuthController")
const isAuthenticated = require("../../Middleware/isAuthenticated")
const catchAsync = require("../../Services/catchAsync")

const router = require("express").Router()

router.route("/register").post(catchAsync(registerUser))
router.route("/login").post(catchAsync(loginUser))
router.route("/forgotpassword").post(catchAsync(forgotpassword))
router.route("/verifyotp").post(catchAsync(VerifyOTP))
router.route("/resetpassword").post(catchAsync(ResetPassword))
router.route("/me").get(isAuthenticated,catchAsync(getMe))

module.exports = router
