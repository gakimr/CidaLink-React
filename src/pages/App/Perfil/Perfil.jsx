import { useState } from "react";
import "./Perfil.css";

const OCORRENCIAS_MOCK = [
  { id: 1, categoria: "Buraco na Rua", endereco: "Rua Sete de Setembro, 120", status: "pendente", data: "12/09/2026" },
  { id: 2, categoria: "Iluminação Pública", endereco: "Av. João Perissinoti, 45", status: "andamento", data: "05/09/2026" },
  { id: 3, categoria: "Acúmulo de Lixo", endereco: "Rua Prudente de Morais, 88", status: "resolvida", data: "28/08/2026" },
];

const STATUS_LABEL = {
  pendente: "Pendente",
  andamento: "Em Andamento",
  resolvida: "Resolvida",
};

export default function Perfil() {
  const [editando, setEditando] = useState(false);
  const [dados, setDados] = useState({
    nome: "Katia Pereira",
    cpf: "232.424.242-42",
    email: "katy@gmail.com",
    bairro: "",
    rua: "",
    latitude: "",
    longitude: "",
  });
  const [ocorrencias, setOcorrencias] = useState(OCORRENCIAS_MOCK);

  function handleChange(campo, valor) {
    setDados((prev) => ({ ...prev, [campo]: valor }));
  }

  function handleSalvar() {
    // TODO: enviar para a API quando o backend estiver pronto
    console.log("Dados salvos:", dados);
    setEditando(false);
  }

  function handleExcluir(id) {
    // TODO: chamar API de exclusão quando o backend estiver pronto
    setOcorrencias((prev) => prev.filter((o) => o.id !== id));
  }

  const pendentes = ocorrencias.filter((o) => o.status === "pendente").length;
  const andamento = ocorrencias.filter((o) => o.status === "andamento").length;
  const resolvidas = ocorrencias.filter((o) => o.status === "resolvida").length;

  return (
    <>
      <h1 className="app-titulo">Meu Perfil</h1>

      <div className="perfil-page">
        <div className="perfil-card">
          <div className="perfil-avatar-bloco">
            <div className="perfil-avatar">CL</div>
            <h2>{dados.nome}</h2>
            <span className="perfil-badge">Cidadão Ativo</span>
          </div>

          <div className="perfil-divisor" />

          <div className="perfil-dados">
            <div className="perfil-dados-topo">
              <h3>Dados Cadastrais</h3>
              <button
                type="button"
                className="btn btn-primario"
                onClick={() => (editando ? handleSalvar() : setEditando(true))}
              >
                {editando ? "Salvar" : "Editar"}
              </button>
            </div>

            <div className="perfil-grid">
              <div className="perfil-campo">
                <label htmlFor="nome">Nome Completo</label>
                <input
                  id="nome"
                  type="text"
                  value={dados.nome}
                  disabled={!editando}
                  onChange={(e) => handleChange("nome", e.target.value)}
                />
              </div>

              <div className="perfil-campo">
                <label htmlFor="cpf">CPF</label>
                <input id="cpf" type="text" value={dados.cpf} disabled />
              </div>

              <div className="perfil-campo">
                <label htmlFor="email">E-mail</label>
                <input
                  id="email"
                  type="email"
                  value={dados.email}
                  disabled={!editando}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>

              <div className="perfil-campo">
                <label htmlFor="bairro">Bairro</label>
                <input
                  id="bairro"
                  type="text"
                  value={dados.bairro}
                  disabled={!editando}
                  onChange={(e) => handleChange("bairro", e.target.value)}
                />
              </div>

              <div className="perfil-campo">
                <label htmlFor="rua">Rua</label>
                <input
                  id="rua"
                  type="text"
                  value={dados.rua}
                  disabled={!editando}
                  onChange={(e) => handleChange("rua", e.target.value)}
                />
              </div>

              <div className="perfil-campo">
                <label htmlFor="latitude">Latitude</label>
                <input
                  id="latitude"
                  type="text"
                  value={dados.latitude}
                  disabled={!editando}
                  onChange={(e) => handleChange("latitude", e.target.value)}
                />
              </div>

              <div className="perfil-campo">
                <label htmlFor="longitude">Longitude</label>
                <input
                  id="longitude"
                  type="text"
                  value={dados.longitude}
                  disabled={!editando}
                  onChange={(e) => handleChange("longitude", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="resumo-card">
          <h3>Resumo das Ocorrências</h3>
          <div className="resumo-grid">
            <div className="resumo-item resumo-pendente">
              <strong>{pendentes}</strong>
              <span>Pendentes</span>
            </div>
            <div className="resumo-item resumo-andamento">
              <strong>{andamento}</strong>
              <span>Em Andamento</span>
            </div>
            <div className="resumo-item resumo-resolvida">
              <strong>{resolvidas}</strong>
              <span>Resolvidas</span>
            </div>
          </div>
        </div>

        <div className="lista-card">
          <h3>Minhas Ocorrências Reportadas</h3>

          {ocorrencias.length === 0 && (
            <p className="lista-vazia">Você ainda não reportou nenhuma ocorrência.</p>
          )}

          <ul className="lista-ocorrencias">
            {ocorrencias.map((o) => (
              <li key={o.id} className="lista-item">
                <div className="lista-item-info">
                  <span className={`status-ponto status-${o.status}`}></span>
                  <div>
                    <strong>{o.categoria}</strong>
                    <p>{o.endereco}</p>
                  </div>
                </div>

                <div className="lista-item-acoes">
                  <span className={`status-tag status-tag-${o.status}`}>
                    {STATUS_LABEL[o.status]}
                  </span>
                  <span className="lista-item-data">{o.data}</span>
                  {o.status === "pendente" && (
                    <>
                      <button type="button" className="btn-icone" title="Editar">
                        ✎
                      </button>
                      <button
                        type="button"
                        className="btn-icone btn-icone-excluir"
                        title="Excluir"
                        onClick={() => handleExcluir(o.id)}
                      >
                        ✕
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}