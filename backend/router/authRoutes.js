const express = require("express");
const router = express.Router();

const authController = require("../controller/authControllers.js");
const { verificarToken } = require("../middleware/authMiddleware.js");

router.post("/login", authController.Login);
router.post("/cadastro", authController.Cadastro);
router.put("/perfil", verificarToken, authController.AtualizarPerfil);

module.exports = router;
