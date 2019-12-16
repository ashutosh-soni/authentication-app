const express = require("express");
const authController = require("../controllers/authController.js");
const router = express.Router();

router.get("/", (req, res) => {res.send("Hi from router");});

router.post("/register", authController.registerValidate, authController.register );
router.post("/login", authController.registerValidate, authController.login);

module.exports =router;
