let mongoose = require("mongoose")


let connection = async () => {
    await mongoose.connect("mongodb+srv://shreaydeepsinhvaghela:v1Lt05kT5h2dDsBF@blog-project.bljsv.mongodb.net/?retryWrites=true&w=majority&appName=blog-project");
    console.log("db connected")
}

module.exports = connection