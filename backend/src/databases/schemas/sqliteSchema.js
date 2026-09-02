class DatabaseSchemaSqlite {
    static async initialize(dbStrategy) {
        console.log("Verificando e estruturando tabelas no SQLite...");
        
        const queries = [
           
            `CREATE TABLE IF NOT EXISTS bairros (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                bairro TEXT NOT NULL UNIQUE
            )`,

            `CREATE TABLE IF NOT EXISTS logradouros (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                logradouro TEXT NOT NULL,
                longitude TEXT NOT NULL,
                latitude TEXT NOT NULL,
                bairro_id INTEGER,
                FOREIGN KEY (bairro_id) REFERENCES bairros(id)
            )`,

            `CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                cpf TEXT NOT NULL UNIQUE,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                fotoPerfil TEXT,
                logradouro_id INTEGER,
                FOREIGN KEY (logradouro_id) REFERENCES logradouros(id)
            )`,

              `CREATE TABLE IF NOT EXISTS ocorrencias (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                titulo TEXT NOT NULL,
                descricao TEXT NOT NULL,
                categoria TEXT NOT NULL,
                status TEXT DEFAULT 'Pendente',
                data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
                fotoOcorrencia TEXT,
                resposta_admin TEXT,
                user_id INTEGER,
                logradouro_id INTEGER,
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (logradouro_id) REFERENCES logradouros(id)
            )`,
            
            ` CREATE TABLE IF NOT EXISTS mensagens (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                conversa_id TEXT NOT NULL,
                usuario_id INTEGER NOT NULL,
                nome TEXT NOT NULL,
                foto TEXT,
                texto TEXT NOT NULL,
                data_envio DATETIME DEFAULT CURRENT_TIMESTAMP
                );`

        ];

        for (const query of queries) {
            await dbStrategy.execute(query);
        }
    }
}

module.exports = { DatabaseSchemaSqlite }