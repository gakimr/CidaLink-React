const chatModel = require("../model/chatModel");

function idValido(valor) {
    return Number.isInteger(Number(valor)) && Number(valor) > 0;
}

async function ListConversations(req, res) {
    try {
        const data = await chatModel.ListConversations();
        return res.status(200).json({ message: "Success", data });
    } catch (error) {
        console.error("Erro ao listar conversas:", error);
        return res.status(500).json({ message: "Error", data: "Não foi possível carregar as conversas." });
    }
}

async function GetMessages(req, res) {
    const { conversationId } = req.params;
    if (!idValido(conversationId)) {
        return res.status(400).json({ message: "Error", data: "Conversa inválida." });
    }

    try {
        const data = await chatModel.GetMessages(Number(conversationId));
        return res.status(200).json({ message: "Success", data });
    } catch (error) {
        console.error("Erro ao carregar mensagens:", error);
        return res.status(500).json({ message: "Error", data: "Não foi possível carregar as mensagens." });
    }
}

async function PostMessage(req, res) {
    const { conversationId } = req.params;
    const userId = Number(req.body.user_id);
    const text = typeof req.body.texto === "string" ? req.body.texto.trim() : "";

    if (!idValido(conversationId) || !idValido(userId) || !text) {
        return res.status(400).json({ message: "Error", data: "Informe uma conversa, remetente e mensagem válida." });
    }
    if (text.length > 4000) {
        return res.status(400).json({ message: "Error", data: "A mensagem deve ter no máximo 4000 caracteres." });
    }

    try {
        const data = await chatModel.PostMessage(Number(conversationId), userId, text);
        if (!data) {
            return res.status(404).json({ message: "Error", data: "Remetente não encontrado." });
        }
        return res.status(201).json({ message: "Success", data });
    } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
        return res.status(500).json({ message: "Error", data: "Não foi possível enviar a mensagem." });
    }
}

module.exports = { ListConversations, GetMessages, PostMessage };