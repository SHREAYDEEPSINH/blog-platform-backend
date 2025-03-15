let mongoose = require("mongoose")


let userSchema = mongoose.Schema({
    userName : {
        type : String,
        required: true
    },
    email : {
        type : String,
        required: true
    },
    password : {
        type : String,
        required: true
    },
    role : {
        type : "String",
        enum : ["user" , "author" , "admin"] ,
        default : "user"
    }
})


const UserModel = mongoose.model("User" , userSchema)

module.exports = UserModel