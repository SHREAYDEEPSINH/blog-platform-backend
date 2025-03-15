const express = require("express")
const UserModel = require("../models/User")
const { protect } = require("../middleware/auth")
const { authorize } = require("../middleware/auth")

const adminRouter =express.Router()


adminRouter.get("/users" , protect , authorize("admin") , async (req,res)=>{
    const usersDetails = await UserModel.find()
    res.status(200).json({usersDetails})
})






module.exports = adminRouter