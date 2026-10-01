import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, usuarioAtual } from "../../../services/api";
import "./CriarOcorrencia.css";

export default function CriarOcorrencia() {
  const [campos, setCampos] = useState({
    titulo: "",
    descricao: "",
    categoria: "",
    rua: "",
    bairro: "",
    latitude: "",
    longitude: "",
  });
  const [foto, setFoto] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  function atualizarCampo(event) {
    setCampos((atuais) => ({ ...atuais, [event.target.name]: event.target.value }));
  }

  async function enviar(event) {
    event.preventDefault();
    setMensagem("");
    const usuario = usuarioAtual();
    if (!usuario?.id) {
      setMensagem("Entre na sua conta para registrar uma ocorrência.");
      return;
    }

    setCarregando(true);
    try {
      const dados = new FormData();
      Object.entries(campos).forEach(([campo, valor]) => dados.append(campo, valor));
      dados.append("user_id", usuario.id);
      dados.append("status", "Pendente");
      if (foto) dados.append("uploadFoto", foto);

      await api("/ocorrencias", { method: "POST", body: dados });
      navigate("/app");
    } catch (erro) {
      setMensagem(erro.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <section className="criar-ocorrencia">
      <header className="criar-ocorrencia-cabecalho">
        <div>
          <h1>Nova ocorrência</h1>
          <p>Registre um problema para acompanhamento da comunidade.</p>
        </div>
        <Link to="/app" className="criar-voltar">Voltar ao feed</Link>
      </header>

      <form className="ocorrencia-formulario" onSubmit={enviar}>
        <label>
          Título
          <input name="titulo" value={campos.titulo} onChange={atualizarCampo} required maxLength={120} />
        </label>
        <label>
          Categoria
          <input name="categoria" value={campos.categoria} onChange={atualizarCampo} required maxLength={80} />
        </label>
        <label className="ocorrencia-campo-largo">
          Descrição
          <textarea name="descricao" value={campos.descricao} onChange={atualizarCampo} required rows={5} maxLength={2000} />
        </label>
        <label>
          Rua ou avenida
          <input name="rua" value={campos.rua} onChange={atualizarCampo} required maxLength={120} />
        </label>
        <label>
          Bairro
          <input name="bairro" value={campos.bairro} onChange={atualizarCampo} required maxLength={100} />
        </label>
        <label>
          Latitude
          <input name="latitude" type="number" step="any" value={campos.latitude} onChange={atualizarCampo} required />
        </label>
        <label>
          Longitude
          <input name="longitude" type="number" step="any" value={campos.longitude} onChange={atualizarCampo} required />
        </label>
        <label className="ocorrencia-campo-largo">
          Foto (opcional)
          <input type="file" accept="image/*" onChange={(event) => setFoto(event.target.files?.[0] || null)} />
        </label>

        {mensagem && <p className="ocorrencia-mensagem" role="alert">{mensagem}</p>}
        <div className="ocorrencia-acoes ocorrencia-campo-largo">
          <button type="submit" disabled={carregando}>
            {carregando ? "Enviando..." : "Publicar ocorrência"}
          </button>
        </div>
      </form>
    </section>
  );
}