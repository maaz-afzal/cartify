const { authSignUp, authLogin } = require("../controllers/authController");
const { authLimiter } = require("../middlewares/rateLimiter");
const express = require("express");
const router = express.Router();

router.post("/signup", authLimiter, authSignUp);
router.post("/login", authLimiter, authLogin);

module.exports = router;
