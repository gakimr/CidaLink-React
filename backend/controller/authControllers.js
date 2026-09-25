const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authModel = require("../model/authmodel.js");

function gerarToken(user) {
  return jwt.sign(
    {
      id: user.id,
      tipo: user.tipo,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    },
  );
}

async function Login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Error",
        data: "E-mail e senha são obrigatórios.",
      });
    }

    const user = await authModel.GetUSerbyEmail(email);

    if (!user) {
      return res.status(401).json({
        message: "Error",
        data: "E-mail ou senha incorretos.",
      });
    }

    const senhaValida = await bcrypt.compare(password, user.senha);

    // Senha incorreta
    if (!senhaValida) {
      return res.status(401).json({
        message: "Error",
        data: "E-mail ou senha incorretos.",
      });
    }

    const token = gerarToken(user);

    return res.status(200).json({
      message: "Success",

      data: {
        token,

        user: {
          id: user.id,
          nome: user.nome,
          email: user.email,
          tipo: user.tipo,

          bairro: user.bairro || "",
          rua: user.rua || "",

          latitude: user.latitude || "",
          longitude: user.longitude || "",

          fotoPerfil: user.foto_perfil || null,

          cpf: user.cpf,
        },
      },
    });
  } catch (error) {
    console.error("Erro no authController (Login):", error);

    return res.status(500).json({
      message: "Error",
      data: "Erro interno no servidor.",
    });
  }
}

async function Cadastro(req, res) {
  try {
    const { nome, cpf, email, password, tipo } = req.body;

    if (!nome || !cpf || !email || !password) {
      return res.status(400).json({
        message: "Error",
        data: "Por favor, preencha todos os campos.",
      });
    }

    const tipoFinal = tipo === "admin" ? "admin" : "cidadao";

    const emailExistente = await authModel.GetUSerbyEmail(email);

    if (emailExistente) {
      return res.status(409).json({
        message: "Error",
        data: "Este e-mail já está cadastrado.",
      });
    }

    const senhaHash = await bcrypt.hash(password, 10);

    const novoId = await authModel.CreateUser({
      nome,
      cpf,
      email,
      senhaHash,
      tipo: tipoFinal,
    });

    // Gera o token
    const token = jwt.sign(
      {
        id: novoId,
        tipo: tipoFinal,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1d",
      },
    );

    return res.status(201).json({
      message: "Success",

      data: {
        token,

        usuario: {
          id: novoId,
          nome,
          email,
          tipo: tipoFinal,
          cpf,
        },
      },
    });
  } catch (error) {
    console.error("Erro no AuthController (Cadastro):", error);

    return res.status(500).json({
      message: "Error",
      data: "Erro interno no servidor.",
    });
  }
}

module.exports = {
  Login,
  Cadastro,
};
