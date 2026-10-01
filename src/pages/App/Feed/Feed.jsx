import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE, api } from '../../../services/api';
import FeedPost from "../../../components/FeedPost/Feedpost";
import "./Feed.css";

function normalizarStatus(status = '') {
  const valor = status.toLowerCase();
  if (valor.includes('resol')) return 'resolvido';
  if (valor.includes('andamento')) return 'andamento';
  return 'pendente';
}

function formatarOcorrencia(ocorrencia) {
  return {
    ...ocorrencia,
    autor: ocorrencia.nome_usuario || 'Cidadão',
    local: [ocorrencia.bairro, ocorrencia.rua].filter(Boolean).join(' - ') || 'Local não informado',
    status: normalizarStatus(ocorrencia.status),
    avatar: ocorrencia.foto_usuario ? `${API_BASE}/uploads/${ocorrencia.foto_usuario}` : null,
    imagem: ocorrencia.fotoOcorrencia ? `${API_BASE}/uploads/${ocorrencia.fotoOcorrencia}` : null,
    votos: 0,
  };
}

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    let ativo = true;
    api('/ocorrencias')
      .then((resposta) => {
        const lista = resposta?.data || resposta;
        if (ativo) setPosts(Array.isArray(lista) ? lista.map(formatarOcorrencia) : []);
      })
      .catch((erro) => {
        if (ativo) setMensagem(`${erro.message} Verifique se o backend está ativo na porta 3000.`);
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });

    return () => { ativo = false; };
  }, []);

  const postsFiltrados = filtro ? posts.filter((post) => post.status === filtro) : posts;

  return (
    <section className="feed-pagina">
      <div className="feed-topo">
        <h1 className="app-titulo">Feed da Comunidade</h1>
        <p>Acompanhe as ocorrências publicadas pelos cidadãos.</p>
      </div>

      <div className="feed-filtros">
        <button type="button" className={`feed-filtro ${!filtro ? 'feed-filtro-ativo' : ''}`} onClick={() => setFiltro('')}>
          Todas
        </button>

        <button type="button" className={`feed-filtro ${filtro === 'pendente' ? 'feed-filtro-ativo' : ''}`} onClick={() => setFiltro('pendente')}>
          Pendentes
        </button>

        <button type="button" className={`feed-filtro ${filtro === 'andamento' ? 'feed-filtro-ativo' : ''}`} onClick={() => setFiltro('andamento')}>
          Em andamento
        </button>

        <button type="button" className={`feed-filtro ${filtro === 'resolvido' ? 'feed-filtro-ativo' : ''}`} onClick={() => setFiltro('resolvido')}>
          Resolvidas
        </button>

        <Link to="/app/criar-ocorrencia" className="feed-criar-btn">
          Nova ocorrência
        </Link>
      </div>

      <div className="feed-lista">
        {carregando && <p className="feed-estado">Carregando ocorrências...</p>}
        {!carregando && mensagem && <p className="feed-estado feed-estado-erro">{mensagem}</p>}
        {!carregando && !mensagem && postsFiltrados.length === 0 && (
          <p className="feed-estado">Nenhuma ocorrência encontrada.</p>
        )}
        {postsFiltrados.map((post) => <FeedPost key={post.id} post={post} />)}
      </div>
    </section>
  );
}