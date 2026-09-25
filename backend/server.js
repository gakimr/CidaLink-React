const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./router/authRoutes.js");
const { db } = require("./databases/databaseContext.js");

const app = express();

app.use(cors());
app.use(express.json());

app.use(authRoutes);

const Port = process.env.PORT || 3000;

async function startServer() {
  try {
    console.log(`Iniciando banco de dados: ${process.env.DB_TYPE || "mysql"}`);
    await db.init();

    app.listen(Port, () => {
      console.log(
        `Servidor rodando na porta: ${Port}\nPressione CTRL+C para cancelar o servidor!`,
      );
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
  }
}

startServer();
