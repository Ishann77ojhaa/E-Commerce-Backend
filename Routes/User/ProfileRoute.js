const { getmyprofile, deletemyprofile, updatemyprofile, updatemypassword } = require("../../Conroller/User/Profile/Profilecontroller")
const isAuthenticated = require("../../Middleware/isAuthenticated")
const catchAsync = require("../../Services/catchAsync")

const router = require("express").Router()

router.route("/")
.get(isAuthenticated,catchAsync(getmyprofile))
.delete(isAuthenticated,catchAsync(deletemyprofile))
.patch(isAuthenticated,catchAsync(updatemyprofile))

router.route("/changepassword")
.patch(isAuthenticated,catchAsync(updatemypassword))


module.exports = router;