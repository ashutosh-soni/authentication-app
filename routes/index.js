const express = require("express");
const userController = require("../controllers/userController.js");
const router = express.Router();

router.get("/", (req, res) => {res.send("Hi from router");});

router.post("/register", userController.registerValidate, userController.register );
router.post("/login", userController.registerValidate, userController.login);

module.exports =router;
