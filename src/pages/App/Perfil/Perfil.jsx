import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../services/api";
import { CompleteCadastro } from "../../../utils/Cadastro";
import "./Perfil.css";

const OCORRENCIAS_MOCK = [
  {
    id: 1,
    categoria: "Buraco na Rua",
    endereco: "Rua Sete de Setembro, 120",
    status: "pendente",
    data: "12/09/2026",
  },
  {
    id: 2,
    categoria: "Iluminação Pública",
    endereco: "Av. João Perissinoti, 45",
    status: "andamento",
    data: "05/09/2026",
  },
  {
    id: 3,
    categoria: "Acúmulo de Lixo",
    endereco: "Rua Prudente de Morais, 88",
    status: "resolvida",
    data: "28/08/2026",
  },
];

const STATUS_LABEL = {
  pendente: "Pendente",
  andamento: "Em Andamento",
  resolvida: "Resolvida",
};

function dadosIniciais(user) {
  return {
    nome: user.nome || "",
    email: user.email || "",
    latitude: user.latitude || "",
    longitude: user.longitude || "",
  };
}

export default function Perfil() {
  const { user, atualizarUser } = useAuth();

  const incompleto = !CompleteCadastro(user);

  const [editando, setEditando] = useState(incompleto);
  const [dados, setDados] = useState(() => dadosIniciais(user));
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [ocorrencias, setOcorrencias] = useState(OCORRENCIAS_MOCK);

  const iniciais = user.nome
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0].toUpperCase())
    .join("");

  function handleChange(campo, valor) {
    setDados((prev) => ({ ...prev, [campo]: valor }));
  }

  function handleCancelar() {
    setDados(dadosIniciais(user));
    setErro("");
    setEditando(false);
  }

  async function handleSalvar() {
    setErro("");
    setSucesso("");
    setSalvando(true);

    try {
      const resposta = await api.put("/perfil", dados);
      atualizarUser(resposta.data.data.user);
      setEditando(false);
      setSucesso("Dados atualizados com sucesso.");
    } catch (error) {
      setErro(error.response?.data?.data || "Erro ao salvar. Tente novamente.");
    } finally {
      setSalvando(false);
    }
  }

  function handleExcluir(id) {
    // TODO: chamar a API quando as postagens existirem no backend
    setOcorrencias((prev) => prev.filter((o) => o.id !== id));
  }

  function usarMinhaLocalizacao() {
    if (!navigator.geolocation) {
      setErro("Seu navegador não suporta geolocalização.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setDados((prev) => ({
          ...prev,
          latitude: String(pos.coords.latitude),
          longitude: String(pos.coords.longitude),
        }));
        setErro("");
      },
      () =>
        setErro(
          "Não foi possível obter sua localização. Preencha manualmente.",
        ),
    );
  }

  const pendentes = ocorrencias.filter((o) => o.status === "pendente").length;
  const andamento = ocorrencias.filter((o) => o.status === "andamento").length;
  const resolvidas = ocorrencias.filter((o) => o.status === "resolvida").length;

  return (
    <>
      <h1 className="app-titulo">Meu Perfil</h1>

      {incompleto && (
        <div className="perfil-aviso">
          <strong>Conclua seu cadastro</strong>
          <p>
            Falta pouco! Informe sua localização para aproveitar tudo no
            CidaLink.
          </p>
        </div>
      )}

      <div className="perfil-page">
        <div className="perfil-card">
          <div className="perfil-avatar-bloco">
            <div className="perfil-avatar">{iniciais}</div>
            <h2>{user.nome}</h2>
            <span className="perfil-badge">
              {user.tipo === "admin" ? "Administrador" : "Cidadão Ativo"}
            </span>
          </div>

          <div className="perfil-divisor" />

          <div className="perfil-dados">
            <div className="perfil-dados-topo">
              <h3>Dados Cadastrais</h3>

              <div className="perfil-acoes">
                {editando && (
                  <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={handleCancelar}
                    disabled={salvando}
                  >
                    Cancelar
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-primario"
                  disabled={salvando}
                  onClick={() =>
                    editando ? handleSalvar() : setEditando(true)
                  }
                >
                  {salvando ? "Salvando..." : editando ? "Salvar" : "Editar"}
                </button>
              </div>
            </div>

            {erro && <p className="perfil-msg perfil-msg-erro">{erro}</p>}
            {sucesso && <p className="perfil-msg perfil-msg-ok">{sucesso}</p>}

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
                <input id="cpf" type="text" value={user.cpf || ""} disabled />
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

            {editando && (
              <button
                type="button"
                className="btn-localizacao"
                onClick={usarMinhaLocalizacao}
              >
                📍 Usar minha localização
              </button>
            )}
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
            <p className="lista-vazia">
              Você ainda não reportou nenhuma ocorrência.
            </p>
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
                      <button
                        type="button"
                        className="btn-icone"
                        title="Editar"
                      >
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
