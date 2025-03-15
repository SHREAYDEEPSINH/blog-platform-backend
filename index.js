let express = require("express")
const connection = require("./config/db")
const { configDotenv } = require("dotenv")
const userRouter = require("./routes/userRouter")
const postRouter = require("./routes/postRouter")
const cors = require("cors")
const adminRouter = require("./routes/adminRouter")
const path=require("path")

configDotenv()
let app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use("/user" , userRouter)
app.use("/" , postRouter)
app.use("/admin" , adminRouter)


app.listen(process.env.PORT, (error) => {
    if (error) {
        alert(error)
    } else {
        console.log(`server run on ${process.env.PORT}`)
        connection()
    }
})