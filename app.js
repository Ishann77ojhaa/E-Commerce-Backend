const express = require("express")
const app = express()
const { registerUser, loginUser, test } = require("./Conroller/Authentication/AuthController")
const { Connectdatabase } = require("./Model/Database")
const authrouter = require("./Routes/AuthRoutes")
const productrouter = require("./Routes/ProductRoutes")
const AdminUsersRoute = require("./Routes/AdminUsersRoute")
require("dotenv").config()

app.use(express.json())
app.use(express.urlencoded({extended : true}))

//Database Connection
Connectdatabase()

//All Routes Here
app.use("/api",authrouter)
app.use("/api",productrouter)
app.use("/api",AdminUsersRoute)

//Telling node to gove access to picture in uploads folder
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