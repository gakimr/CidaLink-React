import { MapContainer, TileLayer } from "react-leaflet";
import Sidebar from "../../../components/Sidebar/Sidebar.jsx";
import "./Mapa.css";

export default function Mapa() {
  return (
    <div className="app-layout">
      <Sidebar paginaAtiva="mapa" />

      <main className="app-conteudo">
        <h1 className="app-titulo">Mapa de Ocorrências na Cidade</h1>

        <div className="mapa-container">
          <MapContainer
            center={[-21.4041, -48.5136]}
            zoom={15}
            className="mapa-leaflet"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
        </div>
        <div className="legenda">
          <h4>Legenda:</h4>
          <ul>
            <li>
              <span className="legenda-ponto legenda-pendente"></span>
              Ocorrências Pendentes
            </li>
            <li>
              <span className="legenda-ponto legenda-resolvido"></span>
              Ocorrências Resolvidas
            </li>
            <li>
              <span className="legenda-ponto legenda-andamento"></span>
              Ocorrências em Andamento
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
