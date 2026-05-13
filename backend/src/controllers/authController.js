const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const Cart = require("../models/Cart");

const validateMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ validationErrors: errors.array() });
  }
  next();
};

const validateSignUp = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").trim().notEmpty().isEmail().withMessage("Email is required"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("role")
    .trim()
    .isIn(["user", "admin"])
    .notEmpty()
    .withMessage("Role is required"),
];

// SignUp Authentication
const authSignUp = [
  validateSignUp,
  validateMiddleware,
  async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      if (role !== "user") {
        return res
          .status(400)
          .json({ message: "Only user is allowed to sigup" });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
      });

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      // create an empty cart for the user
      await Cart.create({ userId: user._id, cartItems: [] });

      res.status(201).json({
        message: "User Successfully Signup",
        token,
        user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];

const validateLogin = [
  body("email").trim().isEmail().notEmpty().withMessage("Email is required"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .notEmpty()
    .withMessage("Password are required and must be 6 characters"),
];

// Login Authentication
const authLogin = [
  validateLogin,
  validateMiddleware,
  async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Password" });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.status(200).json({ token, user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];

module.exports = {
  authSignUp,
  authLogin,
};
