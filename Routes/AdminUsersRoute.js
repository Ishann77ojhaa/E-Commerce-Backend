const { getUsers } = require("../Conroller/Admin/User/usercontroller")
const isAuthenticated = require("../Middleware/isAuthenticated")
const restrictTo = require("../Middleware/restrictTo")

const router = require("express").Router()

router.route("/users")
.get(isAuthenticated,restrictTo("Admin"),getUsers)


module.exports = router

