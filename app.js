const express = require("express")
const app = express()

const { Connectdatabase } = require("./Model/Database")


//Routes Here
const authrouter = require("./Routes/Auth/AuthRoutes")
const productrouter = require("./Routes/Admin/ProductRoutes")
const AdminUsersRoute = require("./Routes/Admin/AdminUsersRoute")
const UserReviewRoute = require("./Routes/User/UserReviewRoute")
const ProfileRoute = require("./Routes/User/ProfileRoute")
const CartRoute = require("./Routes/User/CartRoute")

//Dot ENV
require("dotenv").config()

app.use(express.json())
app.use(express.urlencoded({extended : true}))

//Database Connection
Connectdatabase()

//All Routes Here
app.use("/api/auth",authrouter)
app.use("/api/product",productrouter)
app.use("/api/admin",AdminUsersRoute)
app.use("/api/reviews",UserReviewRoute)
app.use("/api/profile",ProfileRoute)
app.use("/api/cart",CartRoute)


//Telling node to give access to picture in uploads folder
app.use(express.static("uploads"))

//Test 
app.get("/", (req, res) => {
    res.status(200).json({
        message: "I am Alive"
    })
})

//PORT Starting
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log("Server has started at PORT " + PORT)
})