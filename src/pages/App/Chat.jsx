import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { api, usuarioAtual } from "../../services/api";
import "./Chat.css";

const INTERVALO_ATUALIZACAO = 4000;

function dataDaMensagem(valor) {
  if (!valor) return "";
  const data = new Date(valor.includes("T") ? valor : `${valor.replace(" ", "T")}Z`);
  return Number.isNaN(data.getTime())
    ? ""
    : data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

function Chat({ admin = false }) {
  const usuario = usuarioAtual() || {};
  const usuarioId = Number(usuario.id);
  const [conversas, setConversas] = useState([]);
  const [conversaId, setConversaId] = useState(() => admin ? "" : (usuario.id ? String(usuario.id) : ""));
  const [mensagens, setMensagens] = useState([]);
  const [texto, setTexto] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");
  const fimMensagens = useRef(null);

  useEffect(() => {
    if (!admin) return undefined;

    let ativo = true;
    async function carregarConversas() {
      try {
        const resposta = await api("/chat/conversas");
        const lista = Array.isArray(resposta?.data) ? resposta.data : [];
        if (!ativo) return;
        setConversas(lista);
        setConversaId((atual) => atual || (lista[0] ? String(lista[0].conversa_id) : ""));
        setErro("");
      } catch (falha) {
        if (ativo) setErro(falha.message || "Não foi possível carregar as conversas.");
      }
    }

    carregarConversas();
    const intervalo = window.setInterval(carregarConversas, INTERVALO_ATUALIZACAO);
    return () => {
      ativo = false;
      window.clearInterval(intervalo);
    };
  }, [admin]);

  useEffect(() => {
    if (!conversaId) {
      setMensagens([]);
      return undefined;
    }

    let ativo = true;
    async function carregarMensagens() {
      try {
        const resposta = await api(`/chat/${conversaId}/mensagens`);
        if (ativo) {
          setMensagens(Array.isArray(resposta?.data) ? resposta.data : []);
          setErro("");
        }
      } catch (falha) {
        if (ativo) setErro(falha.message || "Não foi possível carregar as mensagens.");
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    setCarregando(true);
    carregarMensagens();
    const intervalo = window.setInterval(carregarMensagens, INTERVALO_ATUALIZACAO);
    return () => {
      ativo = false;
      window.clearInterval(intervalo);
    };
  }, [conversaId]);

  useEffect(() => {
    fimMensagens.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [mensagens]);

  async function enviarMensagem(event) {
    event.preventDefault();
    const mensagem = texto.trim();
    if (!mensagem || !conversaId || !usuarioId || enviando) return;

    setEnviando(true);
    setErro("");
    try {
      const resposta = await api(`/chat/${conversaId}/mensagens`, {
        method: "POST",
        body: JSON.stringify({ user_id: usuarioId, texto: mensagem }),
      });
      const enviada = resposta?.data;
      if (enviada) {
        setMensagens((atuais) => atuais.some((item) => item.id === enviada.id)
          ? atuais
          : [...atuais, enviada]);
      }
      setTexto("");
    } catch (falha) {
      setErro(falha.message || "Não foi possível enviar a mensagem.");
    } finally {
      setEnviando(false);
    }
  }

  const conversaAtiva = conversas.find((conversa) => String(conversa.conversa_id) === conversaId);
  const semSessao = !usuarioId;

  return (
    <section className="chat-pagina">
      <header className="chat-cabecalho">
        <div>
          <p className="chat-sobretitulo">Atendimento CidaLink</p>
          <h1>Bate-papo</h1>
          <p>{admin ? "Converse com os cidadãos que entraram em contato." : "Fale com a equipe de atendimento da sua cidade."}</p>
        </div>
        {admin && conversas.length > 0 && (
          <label className="chat-seletor">
            Conversa
            <select value={conversaId} onChange={(event) => setConversaId(event.target.value)}>
              {conversas.map((conversa) => (
                <option key={conversa.conversa_id} value={String(conversa.conversa_id)}>
                  {conversa.nome} {conversa.ultima_mensagem ? `· ${conversa.ultima_mensagem.slice(0, 48)}` : ""}
                </option>
              ))}
            </select>
          </label>
        )}
      </header>

      <div className="chat-painel">
        <div className="chat-painel-cabecalho">
          <div className="chat-avatar" aria-hidden="true">{admin ? (conversaAtiva?.nome?.[0] || "C") : "A"}</div>
          <div>
            <h2>{admin ? (conversaAtiva?.nome || "Conversas com cidadãos") : "Equipe de atendimento"}</h2>
            <p>{conversaId ? "Mensagens atualizadas automaticamente" : "Aguardando a primeira mensagem"}</p>
          </div>
        </div>

        <div className="chat-mensagens" aria-live="polite" aria-busy={carregando}>
          {semSessao ? (
            <div className="chat-estado-vazio">
              <h3>Entre na sua conta para conversar</h3>
              <Link to={admin ? "/loginadm" : "/login"}>Ir para o login</Link>
            </div>
          ) : !conversaId ? (
            <div className="chat-estado-vazio">
              <h3>Nenhuma conversa por enquanto</h3>
              <p>Quando um cidadão enviar uma mensagem, a conversa aparecerá aqui.</p>
            </div>
          ) : mensagens.length === 0 && !carregando ? (
            <div className="chat-estado-vazio">
              <h3>Comece a conversa</h3>
              <p>{admin ? "Envie uma resposta para este cidadão." : "Envie sua dúvida para falar com a equipe."}</p>
            </div>
          ) : (
            mensagens.map((mensagem) => {
              const minha = Number(mensagem.usuario_id) === usuarioId;
              return (
                <article className={`chat-mensagem ${minha ? "minha" : "recebida"}`} key={mensagem.id}>
                  <div className="chat-mensagem-meta">
                    <strong>{minha ? "Você" : mensagem.nome}</strong>
                    <time>{dataDaMensagem(mensagem.data_envio)}</time>
                  </div>
                  <p>{mensagem.texto}</p>
                </article>
              );
            })
          )}
          <div ref={fimMensagens} />
        </div>

        {erro && <p className="chat-erro" role="alert">{erro}</p>}

        <form className="chat-formulario" onSubmit={enviarMensagem}>
          <label className="chat-campo">
            <span className="visualmente-oculto">Escreva sua mensagem</span>
            <textarea
              value={texto}
              onChange={(event) => setTexto(event.target.value)}
              placeholder="Digite uma mensagem..."
              maxLength={4000}
              rows={1}
              disabled={semSessao || !conversaId || enviando}
            />
          </label>
          <button type="submit" disabled={semSessao || !conversaId || !texto.trim() || enviando}>
            {enviando ? "Enviando..." : "Enviar"}
          </button>
        </form>
      </div>
    </section>
  );
}

export function ChatCidadao() {
  return <Chat />;
}

export function ChatAdmin() {
  return <Chat admin />;
}