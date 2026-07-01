const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { register, login, logout, profile } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, profile)
router.get("/logout", logout);

module.exports = router;
