import { useEffect, useState } from "react";
import { CircleMarker, MapContainer, Popup, TileLayer, useMap } from "react-leaflet";
import { api } from "../../../services/api";
import "./Mapa.css";

function corStatus(status = "") {
  const valor = status.toLowerCase();
  if (valor.includes("resol")) return "#16834a";
  if (valor.includes("andamento")) return "#d49a00";
  return "#cf3f3f";
}

function EnquadrarOcorrencias({ pontos }) {
  const mapa = useMap();

  useEffect(() => {
    if (pontos.length) mapa.fitBounds(pontos, { padding: [24, 24], maxZoom: 15 });
  }, [mapa, pontos]);

  return null;
}

export default function Mapa() {
  const [ocorrencias, setOcorrencias] = useState([]);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    let ativo = true;
    api("/ocorrencias")
      .then((resposta) => {
        const lista = resposta?.data || resposta;
        if (ativo) setOcorrencias(Array.isArray(lista) ? lista : []);
      })
      .catch((erro) => {
        if (ativo) setMensagem(`${erro.message} Verifique se o backend está ativo na porta 3000.`);
      });

    return () => { ativo = false; };
  }, []);

  const ocorrenciasComCoordenadas = ocorrencias
    .map((ocorrencia) => ({
      ...ocorrencia,
      latitude: Number(ocorrencia.latitude),
      longitude: Number(ocorrencia.longitude),
    }))
    .filter((ocorrencia) => Number.isFinite(ocorrencia.latitude) && Number.isFinite(ocorrencia.longitude));
  const pontos = ocorrenciasComCoordenadas.map(({ latitude, longitude }) => [latitude, longitude]);

  return (
    <>
      <h1 className="app-titulo">Mapa de Ocorrências na Cidade</h1>
      {mensagem && <p className="mapa-mensagem">{mensagem}</p>}

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
          <EnquadrarOcorrencias pontos={pontos} />
          {ocorrenciasComCoordenadas.map((ocorrencia) => (
            <CircleMarker
              key={ocorrencia.id}
              center={[ocorrencia.latitude, ocorrencia.longitude]}
              radius={8}
              pathOptions={{ color: corStatus(ocorrencia.status), fillOpacity: 0.8 }}
            >
              <Popup>
                <strong>{ocorrencia.titulo || ocorrencia.categoria}</strong>
                <br />{ocorrencia.status || "Pendente"}
                <br />{[ocorrencia.rua, ocorrencia.bairro].filter(Boolean).join(", ") || "Local não informado"}
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      <div className="legenda">
        <h4>Legenda:</h4>
        <ul>
          <li><span className="legenda-ponto legenda-pendente"></span>Ocorrências Pendentes</li>
          <li><span className="legenda-ponto legenda-resolvido"></span>Ocorrências Resolvidas</li>
          <li><span className="legenda-ponto legenda-andamento"></span>Ocorrências em Andamento</li>
        </ul>
      </div>
    </>
  );
}