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

export default function Feed() {
  return (
    <>
      <h1 className="app-titulo">Feed da Comunidade</h1>
      <div className="feed-lista">
        {POSTS.map((post) => (
          <FeedPost key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}