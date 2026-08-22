import { useState } from "react";
import "./Home.css";

const OCORRENCIAS = [
  {
    id: 1,
    foto: "/ocorrencia1.jpeg",
    bairro: "Centro",
    tipo: "Iluminação Pública",
    descricao: "'poste caído perigo para os moradores",
    status: "resolvido",
    top: "58%",
    left: "18%",
  },
  {
    id: 2,
    foto: "/ocorrencia2.jpeg",
    bairro: "Centro",
    tipo: "Buraco na rua",
    descricao: "Buraco na rua atrapalhando o transito",
    status: "andamento",
    top: "48%",
    left: "58%",
  },
];

export default function Home() {
  const [ativa, setAtiva] = useState(1);

  function alternar(id) {
    setAtiva(ativa === id ? null : id);
  }

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="heropic">
            <img src="/hero.jpg" alt="Duas pessoas usando o app CidaLink" />

            <div className="hero-scrim"></div>

            <div className="balao-chat balao1">
              <img src="/lucas.jpg" alt="" />

              <div>
                <span className="nome">Lucas</span>
                <br />A praça do bairro precisa de iluminação
              </div>
            </div>

            <div className="balao-chat balao2 balao-inv">
              <div>
                <span className="nome">Admin Caio</span>
                <br />
                solicitação recebida! Vamos cuidar disso!
              </div>

              <img src="/admin.jpg" alt="" />
            </div>

            <div className="hero-content">
              <h1>
                Sua voz tem poder! <br />
                Use!
              </h1>

              <p>
                Reporte problemas urbanos, acompanhe as soluções de perto e faça
                parte da mudança!
              </p>
            </div>

            <div className="herobtn">
              <a href="#" className="btn btn-primario">
                Sou Cidadão
              </a>

              <a href="#" className="btn btn-secundario">
                Sou Administrador
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="secao-mapa">
        <div className="container mapa-grid">
          <div className="mapa-imagem">
            <div className="mapaframe">
              <img
                src="/mapa.jpeg"
                alt="Mapa da cidade com ocorrências marcadas"
              />
            </div>

            {OCORRENCIAS.map((oc) => (
              <button
                key={oc.id}
                type="button"
                className={`marcador marcador-${oc.status} ${ativa === oc.id ? "marcador-ativo" : ""}`}
                style={{ top: oc.top, left: oc.left }}
                onClick={() => alternar(oc.id)}
                aria-label={`Ver detalhes: ${oc.tipo}`}
              ></button>
            ))}

            {OCORRENCIAS.filter((oc) => oc.id === ativa).map((oc) => (
              <div
                className="mapa-card"
                key={oc.id}
                style={{ top: oc.top, left: oc.left }}
              >
                <button
                  className="mapa-cardfechar"
                  onClick={() => setAtiva(null)}
                >
                  ×
                </button>
                <img src={oc.foto} alt="" />
                <div className="mapa-cardcorpo">
                  <strong className="mapa-cardbairro">{oc.bairro}</strong>
                  <span className="mapa-cardtipo">📁 ⚠ {oc.tipo}</span>
                  <p>{oc.descricao}</p>
                  <span className={`status-tag status-${oc.status}`}>
                    {oc.status === "resolvido" ? "RESOLVIDO" : "EM ANDAMENTO"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mapa-texto">
            <h2>Cidadania em tempo real</h2>

            <p>
              Navegue pelo mapa, acompanhe chamados abertos, em andamento e
              resolvidos.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
