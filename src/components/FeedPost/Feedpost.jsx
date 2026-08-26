import "./Feedpost.css";

const STATUS_LABEL = {
  pendente: "Pendente",
  andamento: "Em andamento",
  resolvido: "Resolvido",
};

export default function FeedPost({ post }) {
  return (
    <article className="feed-post">
      <header className="feed-cabecalho">
        <img src={post.avatar} alt={post.autor} className="feed-avatar" />
        <div className="feed-info">
          <span className="feed-autor">{post.autor}</span>
          <span className="feed-local">{post.local}</span>
        </div>
        <span className={`status-tag status-${post.status}`}>
          {STATUS_LABEL[post.status]}
        </span>
      </header>

      <div className="feed-categoria">{post.categoria}</div>
      <p className="feed-descricao">{post.descricao}</p>

      {post.imagem && (
        <img src={post.imagem} alt="" className="feed-imagem" />
      )}

      <div className="feed-acoes">
        <button type="button" className="feed-acao-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
          </svg>
          {post.votos}
        </button>

        <button type="button" className="feed-acao-btn">
         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
  <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3" />
</svg>
        </button>
      </div>
    </article>
  );
}