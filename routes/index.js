const express = require("express");
const userController = require("../controllers/userController.js");
const router = express.Router();
router.get("/", (req, res) => {res.send("Hi from router");});
router.post("/register", (req, res) => { userController.register(req, res);});
module.exports =router;
