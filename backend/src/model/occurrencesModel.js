const { db } = require("../databases/DatabaseContext.js");
const tableName = 'ocorrencias';

// função auxiliar, busca ou cria o bairro na tabela bairros
async function obterOuInserirBairro(nomeBairro) {
    if (!nomeBairro) return null;
    const nomeLimpo = nomeBairro.trim();
    
    const [rows] = await db.execute("SELECT id FROM bairros WHERE bairro = ?", [nomeLimpo]);
    if (rows && rows.length > 0) {
        return rows[0].id; 
    }
    
    await db.execute("INSERT INTO bairros (bairro) VALUES (?)", [nomeLimpo]);
    const [lastIdRows] = await db.execute("SELECT last_insert_rowid() as id");
    return lastIdRows[0].id;
}

// função auxiliar, busca ou cria o logradouro associado ao bairro
async function obterOuInserirLogradouro(nomeRua, latitude, longitude, bairroId) {
    if (!nomeRua) return null;
    const ruaLimpa = nomeRua.trim();

    const [rows] = await db.execute(
        "SELECT id FROM logradouros WHERE logradouro = ? AND bairro_id = ?", 
        [ruaLimpa, bairroId]
    );
    
    if (rows && rows.length > 0) {
        return rows[0].id;
    }
    
    await db.execute(
        "INSERT INTO logradouros (logradouro, longitude, latitude, bairro_id) VALUES (?, ?, ?, ?)", 
        [ruaLimpa, longitude, latitude, bairroId]
    );
    
    const [lastIdRows] = await db.execute("SELECT last_insert_rowid() as id");
    return lastIdRows[0].id;
}

async function Post(dados) {
    try {
        const { titulo, descricao, categoria, fotoOcorrencia, user_id, rua, bairro, latitude, longitude, status } = dados;
        const statusFinal = status || "Pendente";

        const bairroId = await obterOuInserirBairro(bairro);
        const logradouroId = await obterOuInserirLogradouro(rua, latitude, longitude, bairroId);

        const sql = `
            INSERT INTO ocorrencias (titulo, descricao, categoria, fotoOcorrencia, user_id, logradouro_id, status)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        
        await db.execute(sql, [titulo, descricao, categoria, fotoOcorrencia, user_id, logradouroId, statusFinal]);
        
        const [lastIdRows] = await db.execute("SELECT last_insert_rowid() as id");
        const novoId = lastIdRows[0].id;

        return { id: novoId, titulo, status: statusFinal };

    } catch (error) {
        console.error("Erro SQL no occurrencesModel (Post):", error);
        throw error; 
    }
}

async function Get() {
    try {
        const sql = `
            SELECT 
                o.id, o.titulo, o.descricao, o.categoria, o.fotoOcorrencia, o.status, o.user_id,o.resposta_admin,
                u.name AS nome_usuario,
                u.fotoPerfil AS foto_usuario,
                l.logradouro AS rua, l.latitude, l.longitude,
                b.bairro AS bairro
            FROM ocorrencias o
            INNER JOIN users u ON o.user_id = u.id
            LEFT JOIN logradouros l ON o.logradouro_id = l.id
            LEFT JOIN bairros b ON l.bairro_id = b.id
            ORDER BY o.id DESC
        `;
        const [rows] = await db.execute(sql);
        return rows; 
    } catch (error) {
        console.error("Erro SQL no occurrencesModel (Get):", error);
        throw error;
    }
}

async function getByUserId(userId) {
    const sql = `SELECT * FROM ocorrencias WHERE user_id = ?`;
    return await db.all(sql, [userId]);
}

async function Put(req, res) {
    try {
        const { id } = req.params;
        const { status, resposta_admin } = req.body;

        if (!status) {
            return res.status(400).json({
                message: "Status é obrigatório!"
            });
        }

        await occurrencesModel.AtualizarStatus(id, status, resposta_admin || "");

        return res.status(200).json({
            message: "Success",
            data: "Status e resposta atualizados com sucesso!"
        });

    } catch (error) {
        console.error("Erro no occurrencesController (Put):", error);
        return res.status(500).json({
            message: "Erro ao atualizar ocorrência"
        });
    }
}
async function Delete(id) {
    try {
        const sql = "DELETE FROM ocorrencias WHERE id = ?";
        await db.execute(sql, [id]);
        return true;
    } catch (error) {
        console.error("Erro SQL no occurrencesModel (Delete):", error);
        throw error;
    }
}

function EndPointName(){
  return tableName;
}

async function AtualizarStatus(id, status, resposta_admin = "") {
    const sql = `
        UPDATE ocorrencias
        SET status = ?, resposta_admin = ?
        WHERE id = ?
    `;

    return await db.execute(sql, [status, resposta_admin, id]);
}
function EndPointName(){
  return tableName;
}

module.exports = { Post,Get,getByUserId,Put,Delete,AtualizarStatus,EndPointName };