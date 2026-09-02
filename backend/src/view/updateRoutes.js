const express = require("express");
const Router = express.Router();

const updateController = require("../controller/updateControllers.js");


const upload = require("../utils/upload.js");


Router.put("/update", upload.single("uploadFoto"), updateController.AtualizarPerfil);

module.exports = Router;