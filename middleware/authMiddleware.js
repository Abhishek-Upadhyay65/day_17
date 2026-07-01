const jwt = require("jsonwebtoken");

const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json({
                success: false,
                message: "token not available"
            })
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(decoded.id);
        // without password
        if (!user) {
            return res.status(402).json({
                success: false,
                message: "Invalid Token"
            })
        }
        req.user = user;
        next();
    }
    catch (err) {
        console.log("some error is validating", err);
        res.status(500).json({
            success: false,
            message: "unable to validate token"
        })

    }

};
module.exports = authMiddleware;