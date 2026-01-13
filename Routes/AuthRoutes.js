const { loginUser, registerUser, forgotpassword, VerifyOTP, ResetPassword } = require("../Conroller/Authentication/AuthController")

const router = require("express").Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/forgotpassword").post(forgotpassword)
router.route("/verifyotp").post(VerifyOTP)
router.route("/resetpassword").post(ResetPassword)

module.exports = router
