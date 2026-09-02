const authModel = require("../model/authModel.js");

async function Login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Error", data: "Por favor, preencha todos os campos." });
        }

        const usuario = await authModel.BuscarUsuarioPorEmail(email);

        if (!usuario) {
            return res.status(401).json({ message: "Error", data: "E-mail ou senha incorretos." });
        }

        // 🚨 AJUSTE DE SEGURANÇA: Se o banco retornar propriedades com nomes diferentes (ex: nome, foto_perfil)
        // nós normalizamos aqui para o Front-End receber exatamente o que ele precisa
        const senhaBanco = usuario.password || usuario.senha;

        if (senhaBanco !== password) {
            return res.status(401).json({ message: "Error", data: "E-mail ou senha incorretos." });
        }

        return res.status(200).json({
            message: "Success",
            data: {
                id: usuario.id || usuario.id_user,
                name: usuario.name || usuario.nome,
                email: usuario.email,
                bairro: usuario.bairro || "",
                rua: usuario.rua || "",
                latitude: usuario.latitude || "",
                longitude: usuario.longitude || "",
                fotoPerfil: usuario.fotoPerfil || usuario.foto_perfil || null,
                cpf: usuario.cpf // Garante que o CPF vai para o front desde o login!
            }
        });

    } catch (error) {
        console.error("Erro no authController:", error);
        return res.status(500).json({ message: "Error", data: "Erro interno no servidor." });
    }
}

module.exports = { Login };
