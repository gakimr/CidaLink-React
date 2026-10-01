const { db } = require("../databases/DatabaseContext.js");

async function ListConversations() {
    const sql = `
        SELECT
            u.id AS conversa_id,
            u.name AS nome,
            u.fotoPerfil AS foto,
            MAX(m.data_envio) AS data_ultima,
            (SELECT recente.texto
             FROM mensagens recente
             WHERE recente.conversa_id = CAST(u.id AS CHAR)
             ORDER BY recente.id DESC
             LIMIT 1) AS ultima_mensagem
        FROM users u
        INNER JOIN mensagens m ON m.conversa_id = CAST(u.id AS CHAR)
        GROUP BY u.id, u.name, u.fotoPerfil
        ORDER BY MAX(m.id) DESC
    `;
    const [rows] = await db.execute(sql);
    return rows;
}

async function GetMessages(conversationId) {
    const sql = `
        SELECT id, conversa_id, usuario_id, nome, foto, texto, data_envio
        FROM mensagens
        WHERE conversa_id = ?
        ORDER BY id ASC
    `;
    const [rows] = await db.execute(sql, [String(conversationId)]);
    return rows;
}

async function PostMessage(conversationId, userId, text) {
    const [users] = await db.execute(
        "SELECT name, fotoPerfil FROM users WHERE id = ?",
        [userId]
    );
    if (!users.length) return null;

    const sender = users[0];
    const [result] = await db.execute(
        `INSERT INTO mensagens (conversa_id, usuario_id, nome, foto, texto)
         VALUES (?, ?, ?, ?, ?)`,
        [String(conversationId), userId, sender.name, sender.fotoPerfil || null, text]
    );
    const [messages] = await db.execute(
        `SELECT id, conversa_id, usuario_id, nome, foto, texto, data_envio
         FROM mensagens WHERE id = ?`,
        [result.insertId]
    );
    return messages[0];
}

module.exports = { ListConversations, GetMessages, PostMessage };