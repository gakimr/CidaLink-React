import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usuarioAtual } from "../../services/api";
import "./Conta.css";

const notificacoesIniciais = [
  {
    id: "boas-vindas",
    titulo: "Bem-vindo ao CidaLink",
    descricao: "Acompanhe por aqui as atualizações das suas solicitações.",
    data: "Agora",
    lida: false,
  },
  {
    id: "acompanhar-solicitacao",
    titulo: "Suas solicitações em um só lugar",
    descricao: "Consulte o feed e o mapa para acompanhar os registros da sua região.",
    data: "Hoje",
    lida: false,
  },
];

function chaveNotificacoes(usuario) {
  return `cidalink:notificacoes:${usuario?.id || usuario?.email || "cidadao"}`;
}

function iniciaisDoNome(nome) {
  return nome
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("")
    .toUpperCase();
}

export function NotificacoesCidadao() {
  const usuario = usuarioAtual() || {};
  const [notificacoes, setNotificacoes] = useState(() => {
    try {
      const salvas = localStorage.getItem(chaveNotificacoes(usuario));
      return salvas ? JSON.parse(salvas) : notificacoesIniciais;
    } catch {
      return notificacoesIniciais;
    }
  });
  const naoLidas = notificacoes.filter((notificacao) => !notificacao.lida).length;

  useEffect(() => {
    localStorage.setItem(chaveNotificacoes(usuario), JSON.stringify(notificacoes));
  }, [notificacoes, usuario]);

  return (
    <section className="conta-pagina">
      <header className="conta-cabecalho">
        <div>
          <p className="conta-sobretitulo">Sua conta</p>
          <h1>Notificações</h1>
          <p>Novidades e informações sobre sua atividade no CidaLink.</p>
        </div>
        {naoLidas > 0 && (
          <button
            className="conta-botao conta-botao-secundario"
            type="button"
            onClick={() => setNotificacoes(notificacoes.map((item) => ({ ...item, lida: true })))}
          >
            Marcar todas como lidas
          </button>
        )}
      </header>

      <div className="conta-notificacoes-resumo" aria-live="polite">
        <strong>{naoLidas}</strong>
        <span>{naoLidas === 1 ? "notificação não lida" : "notificações não lidas"}</span>
      </div>

      {notificacoes.length ? (
        <div className="conta-lista-notificacoes">
          {notificacoes.map((notificacao) => (
            <article className={`conta-notificacao ${notificacao.lida ? "lida" : ""}`} key={notificacao.id}>
              <span className="conta-notificacao-indicador" aria-hidden="true" />
              <div className="conta-notificacao-texto">
                <div className="conta-notificacao-topo">
                  <h2>{notificacao.titulo}</h2>
                  <time>{notificacao.data}</time>
                </div>
                <p>{notificacao.descricao}</p>
                {!notificacao.lida && (
                  <button
                    className="conta-link-botao"
                    type="button"
                    onClick={() => setNotificacoes(notificacoes.map((item) =>
                      item.id === notificacao.id ? { ...item, lida: true } : item
                    ))}
                  >
                    Marcar como lida
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="conta-vazio">
          <h2>Tudo em dia</h2>
          <p>Suas notificações foram limpas.</p>
          <button
            className="conta-botao conta-botao-secundario"
            type="button"
            onClick={() => setNotificacoes(notificacoesIniciais)}
          >
            Restaurar notificações de exemplo
          </button>
        </div>
      )}

      {notificacoes.length > 0 && (
        <button className="conta-link-botao conta-limpar" type="button" onClick={() => setNotificacoes([])}>
          Limpar notificações
        </button>
      )}
    </section>
  );
}

export function PerfilCidadao() {
  const [usuario, setUsuario] = useState(() => usuarioAtual() || {});
  const [editando, setEditando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const nome = usuario.name || usuario.nome || usuario.nome_usuario || "Cidadão";
  const email = usuario.email || "";
  const cpf = usuario.cpf || "";
  const telefone = usuario.telefone || usuario.phone || "";
  const cidade = usuario.cidade || usuario.municipio || "";

  function salvarPerfil(event) {
    event.preventDefault();
    sessionStorage.setItem("usuarioLogado", JSON.stringify({
      ...usuario,
      name: usuario.name || usuario.nome || usuario.nome_usuario || nome,
      telefone,
      cidade,
    }));
    setEditando(false);
    setMensagem("Dados atualizados nesta sessão.");
  }

  function atualizarCampo(campo, valor) {
    setUsuario((atual) => ({ ...atual, [campo]: valor }));
    setMensagem("");
  }

  function cancelarEdicao() {
    setUsuario(usuarioAtual() || {});
    setEditando(false);
    setMensagem("");
  }

  return (
    <section className="conta-pagina">
      <header className="conta-cabecalho">
        <div>
          <p className="conta-sobretitulo">Sua conta</p>
          <h1>Meu perfil</h1>
          <p>Consulte e atualize suas informações pessoais.</p>
        </div>
        {!editando && (
          <button className="conta-botao conta-botao-primario" type="button" onClick={() => { setMensagem(""); setEditando(true); }}>
            Editar perfil
          </button>
        )}
      </header>

      <div className="conta-perfil-destaque">
        <div className="conta-avatar" aria-hidden="true">{iniciaisDoNome(nome) || "C"}</div>
        <div>
          <span>Conta cidadã</span>
          <h2>{nome}</h2>
          <p>{email || "E-mail não informado"}</p>
        </div>
      </div>

      <form className="conta-formulario" onSubmit={salvarPerfil}>
        <div className="conta-formulario-cabecalho">
          <div>
            <h2>Dados pessoais</h2>
            <p>Informações associadas à sua conta.</p>
          </div>
        </div>
        <div className="conta-campos">
          <label>
            Nome completo
            <input
              autoComplete="name"
              disabled={!editando}
              required
              value={usuario.name || usuario.nome || usuario.nome_usuario || ""}
              onChange={(event) => atualizarCampo("name", event.target.value)}
            />
          </label>
          <label>
            E-mail
            <input autoComplete="email" disabled value={email} />
          </label>
          <label>
            CPF
            <input disabled value={cpf} />
          </label>
          <label>
            Telefone
            <input
              autoComplete="tel"
              disabled={!editando}
              value={telefone}
              onChange={(event) => atualizarCampo("telefone", event.target.value)}
              placeholder="Adicione seu telefone"
            />
          </label>
          <label>
            Cidade
            <input
              autoComplete="address-level2"
              disabled={!editando}
              value={cidade}
              onChange={(event) => atualizarCampo("cidade", event.target.value)}
              placeholder="Adicione sua cidade"
            />
          </label>
        </div>
        {mensagem && <p className="conta-mensagem" role="status">{mensagem}</p>}
        {editando && (
          <div className="conta-acoes-formulario">
            <button className="conta-botao conta-botao-secundario" type="button" onClick={cancelarEdicao}>
              Cancelar
            </button>
            <button className="conta-botao conta-botao-primario" type="submit">Salvar alterações</button>
          </div>
        )}
      </form>

      <div className="conta-perfil-atalho">
        <div>
          <h2>Suas atividades</h2>
          <p>Veja o que está acontecendo na sua cidade.</p>
        </div>
        <Link to="/app">Abrir página inicial</Link>
      </div>
    </section>
  );
}