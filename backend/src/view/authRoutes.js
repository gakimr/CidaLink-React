const express = require("express");
const Router = express.Router();

const authController = require("../controller/authControllers.js");

Router.post("/login", authController.Login);

module.exports = Router;