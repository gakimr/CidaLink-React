// Importamos o Model especialista em atualizações (que vamos criar no próximo passo)
const updateModel = require("../model/updateModel.js");

async function AtualizarPerfil(req, res) {
    try {
        const { id, name, email, bairro, rua, latitude, longitude } = req.body;
        
        // pega o nome da foto, se não fica nulo
        const fotoPerfil = req.file ? req.file.filename : null;

        if (!id) {
            return res.status(400).json({ message: "Error", data: "Identificação do usuário em falta." });
        }

        //verifica se o user existe antes de tentar alterar o banco
        const usuarioExiste = await updateModel.VerificarUsuarioExistente(id);
        if (!usuarioExiste) {
            return res.status(404).json({ message: "Error", data: "Usuário inválido ou não autenticado." });
        }

        //Envia os dados para o Model salvar no banco de dados
        const dadosAtualizados = await updateModel.ExecutarUpdatePerfil({
            id, name, email, bairro, rua, latitude, longitude, fotoPerfil
        });

        if (dadosAtualizados) {
            return res.status(200).json({ 
                message: "Success", 
                data: dadosAtualizados 
            });
        } else {
            return res.status(400).json({ message: "Error", data: "Nenhuma alteração foi realizada no banco." });
        }

    } catch (error) {
        console.error("Erro no updateController:", error);
        return res.status(500).json({ message: "Error", data: "Erro ao processar atualização no servidor." });
    }
}


module.exports = { AtualizarPerfil };