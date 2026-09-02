const { db } = require("../databases/DatabaseContext.js");


async function BuscarUsuarioPorEmail(email) {
    try {
        const sql = "SELECT * FROM users WHERE email = ?";
        const [rows] = await db.execute(sql, [email]);

        if (rows.length > 0) {
            return rows[0];
        }
        return null;

    } catch (error) {
        console.error("Erro SQL no authModel (BuscarUsuarioPorEmail):", error);
        throw error;
    }
}


module.exports = { BuscarUsuarioPorEmail };