const jwt = require("jsonwebtoken")

const protect = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        res.status(401).json({ message: "token not found" })
    }

    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.secretKey)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json("invalid token")
    }
}

const authorize = (...roles) => (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "Not authenticated" }); 
    }
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "access denied" })
    }
    next()
}

module.exports = { protect, authorize }