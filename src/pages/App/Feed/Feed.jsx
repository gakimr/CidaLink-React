import FeedPost from "../../../components/FeedPost/Feedpost";
import "./Feed.css";

const POSTS = [
  {
    id: 1,
    autor: "Katia Pereira",
    local: "Centro - Rua Prudente de Morais",
    categoria: "🗑️ Acúmulo de Lixo",
    status: "pendente",
    descricao: "Lixo acumulado trazendo bichos e mal cheiro.",
    avatar: "https://i.pravatar.cc/100?img=47",
    imagem: "https://picsum.photos/seed/lixo/800/500",
    votos: 12,
  },
  {
    id: 2,
    autor: "Zayn Macedo",
    local: "Centro - Rua Prudente de Morais",
    categoria: "🚧 Buraco na via",
    status: "andamento",
    descricao: "Buraco grande na esquina, já causou um acidente.",
    avatar: "https://i.pravatar.cc/100?img=12",
    imagem: null,
    votos: 5,
  },
];
//mudança da nilce
export default function Feed() {
  return (
    <section className="feed-pagina">
      <div className="feed-topo">
        <h1 className="app-titulo">Feed da Comunidade</h1>
        <p>Acompanhe as ocorrências publicadas pelos cidadãos.</p>
      </div>

      <div className="feed-filtros">
        <button type="button" className="feed-filtro feed-filtro-ativo">
          Todas
        </button>

        <button type="button" className="feed-filtro">
          Pendentes
        </button>

        <button type="button" className="feed-filtro">
          Em andamento
        </button>

        <button type="button" className="feed-filtro">
          Resolvidas
        </button>

        <button type="button" className="feed-criar-btn">
          Nova ocorrência
        </button>
      </div>

      <div className="feed-lista">
  {POSTS.map((post) => (
    <FeedPost key={post.id} post={post} />
  ))}
</div>
    </section>
  );
}