import logoFatec from "../../assets/fatec.png";
import logoCidalink from "../../assets/LogoCida.svg";
import "./Footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="container footer-grid">
        <div className="footer-sobre">
          <img src={logoCidalink} alt="CidaLink" className="footer-logo" />
          <p>Conectando cidadãos e gestão para transformar a cidade.</p>
          <a href="#" className="btn btn-primario">
            Começe a usar!
          </a>
        </div>

        <div className="footer-coluna">
          <h4>Institucional</h4>
          <ul>
            <li>
              <a href="#">Quem somos</a>
            </li>
            <li>
              <a href="#">Nossa missão</a>
            </li>
            <li>
              <a href="#">Nosso Projeto</a>
            </li>
          </ul>
        </div>

        <div className="footer-coluna">
          <h4>Plataforma</h4>
          <ul>
            <li>
              <a href="#">Mapa Interativo</a>
            </li>
            <li>
              <a href="#">Relatos/Ocorrências</a>
            </li>
            <li>
              <a href="#">Administrador</a>
            </li>
          </ul>
        </div>

        <div className="footer-coluna">
          <h4>Suporte & Legal</h4>
          <ul>
            <li>
              <a href="#">Central de Ajuda</a>
            </li>
            <li>
              <a href="#">Termos de uso</a>
            </li>
            <li>
              <a href="#">Política de Privacidade</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer-base">
        <div className="footer-social">
          <a href="#" className="footer-icone">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <a href="#" className="footer-icone">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
            </svg>
          </a>
        </div>

        <p>2026© Cidalink. Todos os direitos reservados.</p>

        <a
          href="https://fatectq.cps.sp.gov.br/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={logoFatec}
            alt="Fatec Taquaritinga"
            className="footer-fatec"
          />
        </a>
      </div>
    </footer>
  );
}
