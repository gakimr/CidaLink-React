class DatabaseSchemaMysql {
    static async initialize(dbStrategy) {
        console.log("Verificando e estruturando tabelas no MySQL...");
        
        const queries = [
           
            `CREATE TABLE IF NOT EXISTS bairros (
                id INT AUTO_INCREMENT PRIMARY KEY,
                bairro VARCHAR(150) NOT NULL UNIQUE
            )`,

        
            `CREATE TABLE IF NOT EXISTS logradouros (
                id INT AUTO_INCREMENT PRIMARY KEY,
                logradouro VARCHAR(255) NOT NULL,
                longitude VARCHAR(50) NOT NULL,
                latitude VARCHAR(50) NOT NULL,
                bairro_id INT,
                FOREIGN KEY (bairro_id) REFERENCES bairros(id) ON DELETE SET NULL
            )`,
  
            `CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                cpf VARCHAR(14) NOT NULL UNIQUE,
                email VARCHAR(191) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                fotoPerfil TEXT,
                logradouro_id INT,
                FOREIGN KEY (logradouro_id) REFERENCES logradouros(id) ON DELETE SET NULL
            )`,

           ` CREATE TABLE IF NOT EXISTS ocorrencias (
                id INT AUTO_INCREMENT PRIMARY KEY,
                titulo VARCHAR(255) NOT NULL,
                descricao TEXT NOT NULL,
                categoria VARCHAR(100) NOT NULL,
                status VARCHAR(50) DEFAULT 'Pendente',
                data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
                fotoOcorrencia VARCHAR(255),
                user_id INT,
                logradouro_id INT,
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (logradouro_id) REFERENCES logradouros(id)
);`
        ];

        for (const query of queries) {
            await dbStrategy.execute(query);
        }
    }
}

module.exports = { DatabaseSchemaMysql }