import logoCidalink from "../../assets/LogoCida.svg";
import logoCidalinkEscuro from '../../assets/LogoCidaDM.svg'
import "./Prefooter.css";

export default function PreFooter() {
  return (
    <section className="pre-footer">
      <div className="container footer-grid">
        <div className="footer-sobre">
          <img
            src={logoCidalink}
            alt="CidaLink"
            className="footer-logo logo-claro"
          />
          <img
            src={logoCidalinkEscuro}
            alt="CidaLink"
            className="footer-logo logo-escuro"
          />
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
    </section>
  );
}
