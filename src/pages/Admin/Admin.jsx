import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_BASE, api, usuarioAtual } from "../../services/api";
import "./Admin.css";

const DEMO = [
  { id: 101, nome_usuario: "Cidadão 1", titulo: "Iluminação pública", descricao: "Postes sem funcionar na rua.", bairro: "Centro", rua: "Rua B", status: "Pendente" },
  { id: 102, nome_usuario: "Cidadão 2", titulo: "Acúmulo de lixo", descricao: "Descarte irregular atraindo insetos.", bairro: "Jardim", rua: "Avenida C", status: "Em Andamento" },
  { id: 103, nome_usuario: "Cidadão 3", titulo: "Buraco na via", descricao: "Buraco com risco de acidentes.", bairro: "Vila Nova", rua: "Rua das Flores", status: "Resolvido" },
];

const classeStatus = (valor = "") => valor.toLowerCase().includes("resol") ? "resolvido" : valor.toLowerCase().includes("andamento") ? "andamento" : "pendente";

function useOcorrencias() {
  const [itens, setItens] = useState(DEMO);
  const [online, setOnline] = useState(false);
  const carregar = async () => {
    try {
      const resposta = await api("/ocorrencias");
      const lista = resposta?.data || resposta;
      if (Array.isArray(lista)) setItens(lista);
      setOnline(true);
    } catch { setOnline(false); }
  };
  useEffect(() => { carregar(); }, []);
  return { itens, online, carregar };
}

function CabecalhoPagina({ titulo, subtitulo, children }) {
  return <div className="adm-cabecalho"><div><span>Área administrativa</span><h1>{titulo}</h1><p>{subtitulo}</p></div>{children}</div>;
}

function Status({ valor }) { return <span className={`adm-status ${classeStatus(valor)}`}>{valor || "Pendente"}</span>; }

export function AdminInicio() {
  const { itens, online } = useOcorrencias();
  const pendentes = itens.filter((item) => classeStatus(item.status) === "pendente").length;
  const andamento = itens.filter((item) => classeStatus(item.status) === "andamento").length;
  const resolvidas = itens.filter((item) => classeStatus(item.status) === "resolvido").length;
  return <section className="adm-pagina"><CabecalhoPagina titulo="Visão geral" subtitulo={online ? "Dados atualizados pelo servidor." : "Prévia local — inicie o backend para carregar os dados reais."}><Link className="adm-botao primario" to="/admin/ocorrencias">Gerenciar ocorrências</Link></CabecalhoPagina><div className="adm-metricas"><article><span>Pendentes</span><strong>{pendentes}</strong></article><article><span>Em andamento</span><strong>{andamento}</strong></article><article><span>Resolvidas</span><strong>{resolvidas}</strong></article><article><span>Total</span><strong>{itens.length}</strong></article></div><div className="adm-painel"><div className="adm-painel-titulo"><div><h2>Ocorrências recentes</h2><p>Últimos registros enviados pelos cidadãos.</p></div><Link to="/admin/ocorrencias">Ver todas</Link></div><div className="adm-cards">{itens.slice(0, 3).map((item) => <article key={item.id}><div><b>#{item.id}</b><Status valor={item.status} /></div><h3>{item.titulo || item.categoria}</h3><p>{item.descricao}</p><small>{item.bairro || "Bairro não informado"} · {item.rua || "Local não informado"}</small><Link to={`/admin/ocorrencias/${item.id}`}>Analisar ocorrência</Link></article>)}</div></div></section>;
}

export function AdminOcorrencias() {
  const { itens } = useOcorrencias();
  const [busca, setBusca] = useState(""); const [filtro, setFiltro] = useState("");
  const filtrados = useMemo(() => itens.filter((item) => `${item.id} ${item.titulo} ${item.descricao} ${item.bairro}`.toLowerCase().includes(busca.toLowerCase()) && (!filtro || classeStatus(item.status) === filtro)), [itens, busca, filtro]);
  return <section className="adm-pagina"><CabecalhoPagina titulo="Gerenciar ocorrências" subtitulo="Pesquise, acompanhe e atualize as solicitações da cidade." /><div className="adm-painel"><div className="adm-filtros"><input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar por ID, descrição ou bairro"/><select value={filtro} onChange={(e) => setFiltro(e.target.value)}><option value="">Todos os status</option><option value="pendente">Pendentes</option><option value="andamento">Em andamento</option><option value="resolvido">Resolvidas</option></select></div><div className="adm-tabela-wrap"><table><thead><tr><th>ID</th><th>Ocorrência</th><th>Local</th><th>Status</th><th></th></tr></thead><tbody>{filtrados.map((item) => <tr key={item.id}><td>#{item.id}</td><td><strong>{item.titulo || item.categoria}</strong><small>{item.descricao}</small></td><td>{item.bairro || "—"}</td><td><Status valor={item.status}/></td><td><Link className="adm-botao" to={`/admin/ocorrencias/${item.id}`}>Detalhes</Link></td></tr>)}</tbody></table></div></div></section>;
}

export function AdminDetalhe() {
  const { id } = useParams(); const { itens, carregar } = useOcorrencias();
  const item = itens.find((registro) => String(registro.id) === String(id)) || DEMO[0];
  const [status, setStatus] = useState(item.status || "Pendente"); const [resposta, setResposta] = useState(item.resposta_admin || ""); const [mensagem, setMensagem] = useState("");
  useEffect(() => { setStatus(item.status || "Pendente"); setResposta(item.resposta_admin || ""); }, [item.id]);
  const salvar = async () => { try { await api(`/ocorrencias/${id}`, { method: "PUT", body: JSON.stringify({ status, resposta_admin: resposta }) }); setMensagem("Ocorrência atualizada com sucesso."); carregar(); } catch (erro) { setMensagem(erro.message); } };
  return <section className="adm-pagina"><CabecalhoPagina titulo={`Ocorrência #${id}`} subtitulo="Revise os dados e envie uma resposta oficial."><Link className="adm-botao" to="/admin/ocorrencias">Voltar</Link></CabecalhoPagina><div className="adm-detalhe-grid"><article className="adm-painel"><h2>{item.titulo || item.categoria}</h2><Status valor={item.status}/>{item.fotoOcorrencia && <img className="adm-foto" src={`${API_BASE}/uploads/${item.fotoOcorrencia}`} alt="Registro da ocorrência"/>}<p>{item.descricao}</p><dl><div><dt>Cidadão</dt><dd>{item.nome_usuario || "Não informado"}</dd></div><div><dt>Local</dt><dd>{item.rua || "Rua não informada"}, {item.bairro || "bairro não informado"}</dd></div></dl></article><aside className="adm-painel adm-form"><h2>Atualizar atendimento</h2><label>Status<select value={status} onChange={(e) => setStatus(e.target.value)}><option>Pendente</option><option>Em Andamento</option><option>Resolvido</option></select></label><label>Resposta ao cidadão<textarea rows="7" value={resposta} onChange={(e) => setResposta(e.target.value)} placeholder="Informe providências, prazo ou solução."/></label>{mensagem && <p className="adm-mensagem">{mensagem}</p>}<button className="adm-botao primario" onClick={salvar}>Salvar atualização</button></aside></div></section>;
}

export function AdminNotificacoes() { return <section className="adm-pagina"><CabecalhoPagina titulo="Notificações" subtitulo="Atualizações que exigem atenção administrativa."/><div className="adm-painel adm-lista">{[["Nova ocorrência recebida","Um cidadão registrou um problema de iluminação.","Agora"],["Ocorrência atualizada","O protocolo #102 recebeu novas informações.","Há 1 hora"],["Prazo próximo","Há três ocorrências pendentes há mais de sete dias.","Hoje"]].map(([t,d,h]) => <article key={t}><span>●</span><div><h3>{t}</h3><p>{d}</p><small>{h}</small></div></article>)}</div></section>; }

export function AdminChat() { const [texto,setTexto]=useState(""); const [mensagens,setMensagens]=useState([{id:1, autor:"Cidadão", texto:"Olá, gostaria de saber sobre minha ocorrência."}]); const enviar=(e)=>{e.preventDefault();if(!texto.trim())return;setMensagens([...mensagens,{id:Date.now(),autor:"Administração",texto:texto.trim()}]);setTexto("")}; return <section className="adm-pagina"><CabecalhoPagina titulo="Bate-papo" subtitulo="Atendimento direto aos cidadãos."/><div className="adm-painel adm-chat"><div className="adm-mensagens">{mensagens.map(m=><div key={m.id} className={m.autor==="Administração"?"minha":""}><strong>{m.autor}</strong><p>{m.texto}</p></div>)}</div><form onSubmit={enviar}><input value={texto} onChange={e=>setTexto(e.target.value)} placeholder="Digite uma mensagem"/><button className="adm-botao primario">Enviar</button></form></div></section>; }

export function AdminPerfil() { const usuario=usuarioAtual() || {name:"Administrador",email:"admin@cidalink.local"}; return <section className="adm-pagina"><CabecalhoPagina titulo="Meu perfil" subtitulo="Dados da conta administrativa."/><div className="adm-painel adm-perfil"><div className="adm-avatar">{(usuario.name||"A")[0].toUpperCase()}</div><div><h2>{usuario.name || usuario.nome || "Administrador"}</h2><p>{usuario.email}</p><span>Administrador do CidaLink</span></div></div></section>; }
