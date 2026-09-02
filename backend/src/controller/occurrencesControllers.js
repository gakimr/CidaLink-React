const occurrencesModel = require("../model/occurrencesModel.js");
//criar ocorrência
async function Post(req, res) {
    try {
        const { titulo, descricao, categoria, user_id, rua, bairro, latitude, longitude, status } = req.body;
        const fotoOcorrencia = req.file ? req.file.filename : null;

        if (!titulo || !descricao || !categoria || !user_id) {
            return res.status(400).json({ 
                message: "Error", 
                data: "Campos obrigatórios ausentes (Título, Descrição, Categoria ou Usuário)." 
            });
        }

        const resultado = await occurrencesModel.Post({
            titulo, descricao, categoria, fotoOcorrencia, user_id, rua, bairro, latitude, longitude, status
        });

        return res.status(201).json({ message: "Success", data: resultado });

    } catch (error) {
        console.error("Erro no occurrencesController (Post):", error);
        return res.status(500).json({ message: "Error", data: "Erro interno ao processar a postagem." });
    }
}

// listar todas as ocorrências
async function Get(req, res) {
    try {
        const ocorrencias = await occurrencesModel.Get();
        return res.status(200).json({ message: "Success", data: ocorrencias });
    } catch (error) {
        // ...
    }
}
// atualizar ocorrência
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

//deletar ocorrência
async function Delete(req, res) {
    try {
        const { id } = req.params;

        await occurrencesModel.Delete(id);
        return res.status(200).json({ message: "Success", data: "Ocorrência removida com sucesso!" });

    } catch (error) {
        console.error("Erro no occurrencesController (Delete):", error);
        return res.status(500).json({ message: "Error", data: "Erro ao excluir o registro." });
    }
}

function EndPointName(){
  return occurrencesModel.EndPointName();
}

module.exports = {Post,Get,Put,Delete,EndPointName };