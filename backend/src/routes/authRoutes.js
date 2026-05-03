const { authSignUp, authLogin } = require("../controllers/authController");
const express = require("express");
const router = express.Router();

router.post("/signup", authSignUp);
router.post("/login", authLogin);

module.exports = router;
