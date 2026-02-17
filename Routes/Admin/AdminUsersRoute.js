const { getUsers, deleteuser } = require("../../Conroller/Admin/User/usercontroller")
const isAuthenticated = require("../../Middleware/isAuthenticated")
const restrictTo = require("../../Middleware/restrictTo")

const router = require("express").Router()

router.route("/users")
.get(isAuthenticated,restrictTo("Admin"),getUsers)

router.route("/users/:id")
.delete(isAuthenticated,restrictTo("Admin"),deleteuser)

module.exports = router

