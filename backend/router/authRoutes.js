const express = require("express");
const router = express.Router();

const authController = require("../controller/authController.js");

router.post("/login", authController.Login);
router.post("/register", authController.Register);

module.exports = router;
