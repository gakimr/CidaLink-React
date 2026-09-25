const { db } = require("../databases/DatabaseContext.js");

async function GetUSerbyEmail(email) {
  try {
    const sql = "SELECT * FROM users WHERE email = ?";
    const [rows] = await db.execute(sql, [email]);

    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("Erro SQL no authModel (GetUserbyEmail):", error);

    throw error;
  }
}

async function GetUserbycpf(cpf) {
  try {
    const sql = "SELECT * FROM users WHERE cpf = ?";
    const [rows] = await db.execute(sql, [cpf]);

    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("Erro SQL no authModel (GetUserbyCpf):", error);

    throw error;
  }
}

async function CreateUser({ nome, cpf, email, senhaHash, tipo }) {
  try {
    const sql = `
            INSERT INTO users(nome, cpf, email, senha, tipo)
            VALUES (?, ?, ?, ?, ?)
        `;

    const [result] = await db.execute(sql, [nome, cpf, email, senhaHash, tipo]);

    return result.insertId;
  } catch (error) {
    console.error("Erro SQL no authModel (CreateUser):", error);

    throw error;
  }
}

module.exports = {
  GetUSerbyEmail,
  GetUserbycpf,
  CreateUser,
};
