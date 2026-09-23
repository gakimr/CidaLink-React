import { useState } from "react";
import "./CriarOcorrencia.css";

export default function CriarOcorrencia() {
  const [categoria, setCategoria] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [descricao, setDescricao] = useState("");
  const [foto, setFoto] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: enviar para a API depois que o backend estiver pronto
    console.log({ categoria, logradouro, bairro, descricao, foto });
  }

  return (
    <>
      <h1 className="app-titulo">Criar Ocorrência</h1>

      <div className="ocorrencia-page">
        <form className="form-card" onSubmit={handleSubmit}>
          <label htmlFor="categoria">Categoria</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">Selecione o tipo</option>
            <option value="buraco">Buraco na Rua</option>
            <option value="iluminacao">Iluminação Pública</option>
            <option value="lixo">Acúmulo de Lixo</option>
            <option value="saneamento">Problemas de Saneamento</option>
            <option value="outro">Outro</option>
          </select>

          <div className="form-linha">
            <div className="form-campo">
              <label htmlFor="logradouro">Logradouro</label>
              <input
                id="logradouro"
                type="text"
                value={logradouro}
                onChange={(e) => setLogradouro(e.target.value)}
                placeholder="Rua, avenida, número..."
              />
            </div>

            <div className="form-campo">
              <label htmlFor="bairro">Bairro</label>
              <input
                id="bairro"
                type="text"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                placeholder="Nome do bairro"
              />
            </div>
          </div>

          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descreva o problema e informe pontos de referência (ex: próximo à praça central, buraco profundo na via)..."
          />

          <label htmlFor="foto">Anexar Foto</label>
          <input
            id="foto"
            type="file"
            accept="image/*"
            onChange={(e) => setFoto(e.target.files[0])}
          />

          <button type="submit" className="btn btn-primario btn-full">
            Registrar Ocorrência
          </button>
        </form>
      </div>
    </>
  );
}