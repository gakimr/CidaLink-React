const { db } = require("../databases/DatabaseContext.js");

// Verifica se o usuário existe
async function VerificarUsuarioExistente(id) {
    try {

        const sql = "SELECT id FROM users WHERE id = ?";

        const [rows] = await db.execute(sql, [id]);

        return rows && rows.length > 0;

    } catch (error) {

        console.error(
            "Erro SQL no updateModel (VerificarUsuarioExistente):",
            error
        );

        throw error;
    }
}

// Busca ou cria o bairro
async function obterOuInserirBairro(nomeBairro) {

    if (!nomeBairro) return null;

    const nomeLimpo = nomeBairro.trim();

    const [rows] = await db.execute(
        "SELECT id FROM bairros WHERE bairro = ?",
        [nomeLimpo]
    );

    if (rows && rows.length > 0) {
        return rows[0].id;
    }

    await db.execute(
        "INSERT INTO bairros (bairro) VALUES (?)",
        [nomeLimpo]
    );

    const [lastIdRows] = await db.execute(
        "SELECT last_insert_rowid() as id"
    );

    return lastIdRows[0].id;
}

// Busca ou cria logradouro
async function obterOuInserirLogradouro(
    nomeRua,
    latitude,
    longitude,
    bairroId
) {

    if (!nomeRua) return null;

    const ruaLimpa = nomeRua.trim();

    const [rows] = await db.execute(
        "SELECT id FROM logradouros WHERE logradouro = ? AND bairro_id = ?",
        [ruaLimpa, bairroId]
    );

    if (rows && rows.length > 0) {

        await db.execute(
            "UPDATE logradouros SET latitude = ?, longitude = ? WHERE id = ?",
            [
                latitude,
                longitude,
                rows[0].id
            ]
        );

        return rows[0].id;
    }

    await db.execute(
        `INSERT INTO logradouros
        (logradouro, latitude, longitude, bairro_id)
        VALUES (?, ?, ?, ?)`,
        [
            ruaLimpa,
            latitude,
            longitude,
            bairroId
        ]
    );

    const [lastIdRows] = await db.execute(
        "SELECT last_insert_rowid() as id"
    );

    return lastIdRows[0].id;
}

// Atualiza perfil
async function ExecutarUpdatePerfil(dados) {

    try {

        const {
            id,
            name,
            email,
            bairro,
            rua,
            latitude,
            longitude,
            fotoPerfil
        } = dados;

        const bairroId =
            await obterOuInserirBairro(bairro);

        const logradouroId =
            await obterOuInserirLogradouro(
                rua,
                latitude,
                longitude,
                bairroId
            );

        let sql;
        let params;

        if (fotoPerfil) {

            sql = `
                UPDATE users
                SET
                    name = ?,
                    email = ?,
                    logradouro_id = ?,
                    fotoPerfil = ?
                WHERE id = ?
            `;

            params = [
                name,
                email,
                logradouroId,
                fotoPerfil,
                id
            ];

        } else {

            sql = `
                UPDATE users
                SET
                    name = ?,
                    email = ?,
                    logradouro_id = ?
                WHERE id = ?
            `;

            params = [
                name,
                email,
                logradouroId,
                id
            ];
        }

        await db.execute(sql, params);

        const [rows] = await db.execute(
            `
            SELECT
                u.id,
                u.name,
                u.email,
                u.fotoPerfil,
                l.logradouro AS rua,
                l.latitude,
                l.longitude,
                b.bairro AS bairro
            FROM users u
            LEFT JOIN logradouros l
                ON u.logradouro_id = l.id
            LEFT JOIN bairros b
                ON l.bairro_id = b.id
            WHERE u.id = ?
            `,
            [id]
        );

        if (!rows || rows.length === 0) {
            return null;
        }

        return rows[0];

    } catch (error) {

        console.error(
            "Erro detalhado no updateModel:",
            error
        );

        throw error;
    }
}

module.exports = {
    VerificarUsuarioExistente,
    ExecutarUpdatePerfil
};