const express = require("express")
const userRouter = express.Router()

const bcrypt = require("bcrypt")
const UserModel = require("../models/User")
const jwt = require("jsonwebtoken")


userRouter.post("/register", async (req, res) => {
    const { userName, email, password, role } = req.body
    const existUser = await UserModel.findOne({ email })
    if (existUser) {
        return res.status(400).json({ message: "user already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await UserModel.create({ userName, email, password: passwordHash, role: role || "user" })

    res.status(201).json({ message: "user registered", role: user.role })
})

userRouter.post("/login" , async(req,res)=>{
    const {email , password} = req.body
    const user = await UserModel.findOne({email})

    if(user){
        if(await bcrypt.compare(password , user.password)){
            const token = jwt.sign({id : user._id , role : user.role} , process.env.secretKey , { expiresIn: '1h' })
            res.json({token , role : user.role})
            console.log(token)
        }else{
            res.status(401).json({message : "wrong password"})
        }
    }else{
        res.status(401).json({message : "user not found"})
    }
})


module.exports = userRouter