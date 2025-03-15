const express = require("express")
const { protect } = require("../middleware/auth")
const { authorize } = require("../middleware/auth")
const PostModel = require("../models/Post")
const fs = require("fs")
const path = require("path")
const UserModel = require("../models/User")

const postRouter = express.Router()

postRouter.post("/post", protect, authorize("author", "admin"), PostModel.imageUploade, async (req, res) => {
    try {

        let image = null; // Default to null if no image is uploaded
        if (req.file) {
            image = PostModel.imagePath + "/" + req.file.filename;
        }
        const { title, content } = req.body
        const author = req.user.id
        if (!title || !content) {
            res.status(400).json({ message: "Title and content are required" })
        }
        await PostModel.create({ image, title, content, author })
        res.json({ message: "post created" })
    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message })
    }
})

postRouter.get("/getPost", async (req, res) => {
    const postDetails = await PostModel.find().sort({createdAt: -1})
    res.status(200).json({ postDetails })
})

postRouter.delete("/deletePost/:id", async (req, res) => {
    try {
        const getPostUser = await PostModel.findById(req.params.id);
        if (getPostUser) {
            fs.unlinkSync(path.join(__dirname, "..", getPostUser.image))
        }
        await PostModel.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Post Deleted successfully" })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

postRouter.put("/updaterole/:userId", protect, authorize("admin"), async (req, res) => {
    const { role } = req.body
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(req.params.userId, { role });
        res.json({ message: "role updated", user: updatedUser })
    } catch (error) {
        res.status(500).json({ message: "error in role update" })
    }
})


module.exports = postRouter