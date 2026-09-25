const express = require("express");
const router = express.Router();

const authController = require("../controller/authControllers.js");

router.post("/login", authController.Login);
router.post("/cadastro", authController.Cadastro);

module.exports = router;
