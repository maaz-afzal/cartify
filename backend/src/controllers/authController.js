const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

const validateMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
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
          .json({ message: "Only user role allowed in signup" });
      }
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({ message: "User already exists" });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
          name,
          email,
          password: hashedPassword,
          role,
        };
        const user = await User.create(newUser);
        res.status(201).json({
          message: "User Successfully Signup",
          id: user._id,
        });
      }
    } catch (error) {
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
    .withMessage("Password must be at least 6 characters"),
];

// Login Authentication
const authLogin = [
  validateLogin,
  validateMiddleware,
  async (req, res) => {
    try {
      const { email, password, role } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ message: "User not found" });
      } else {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          res.status(400).json({ message: "Invalid credentials" });
        } else {
          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });
          res.status(200).json({ token, user});
        }
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];

module.exports = {
  authSignUp,
  authLogin,
};
