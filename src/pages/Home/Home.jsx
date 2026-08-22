import "./Home.css";

export default function Home() {
  return (
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
            <h1>Sua voz tem poder! <br /> Use!</h1>
            <p>Reporte problemas urbanos, acompanhe as soluções de perto e faça parte da mudança!</p>
          </div>

          <div className="herobtn">
            <a href="#" className="btn btn-primario">Sou Cidadão</a>
            <a href="#" className="btn btn-secundario">Sou Admnistrador</a>
          </div>
          
        </div>
      </div>
    </section>
  );
}
