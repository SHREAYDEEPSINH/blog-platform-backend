let mongoose = require("mongoose")
const multer = require("multer")
let path = require("path")

let imagePath = "/uploads"

let postSchema = mongoose.Schema({
    image:{
        type : String,
        required : true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", "/uploads"))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

postSchema.statics.imageUploade =  multer({ storage: storage }).single("image")
postSchema.statics.imagePath = imagePath

const PostModel = mongoose.model("Post", postSchema)

module.exports = PostModel