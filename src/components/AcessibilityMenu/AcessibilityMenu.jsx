import { useState, useEffect } from "react";
import SvgFiltrosDaltonismo from "./SvgFiltrosDaltonismo";
import "./AcessibilityMenu.css";

const OPCOESFILTRO = [
  "protanopia",
  "protanomalia",
  "deuteranopia",
  "deuteranomalia",
  "tritanopia",
  "tritanomalia",
  "acromatopsia",
];

export default function AcessibilityMenu() {
  const [open, setopen] = useState(false);
  const [darkmode, setdarkmode] = useState(false);
  const [filter, setfilter] = useState(null);

  useEffect(() => {
    document.body.classList.toggle("darkmode", darkmode);
  }, [darkmode]);

  useEffect(() => {
    const raiz = document.documentElement;

    OPCOESFILTRO.forEach((nome) => raiz.classList.remove(`filtro-${nome}`));

    if (filter) {
      raiz.classList.add(`filtro-${filter}`);
    }
  }, [filter]);

  function reset(){
    setfilter(null)
    setdarkmode(false)
  }

  return (
    <div className="acessibility">
      <SvgFiltrosDaltonismo />
      <button
        type="button"
        className="btn-acessibility"
        onClick={() => setopen(!open)}
      >
        🚶🏻‍♂️
      </button>

      {open && (
        <div className="menu-acessibility">
          <button
            type="button"
            className="acessItem"
            onClick={() => setdarkmode(!darkmode)}
          >
            🌙 Modo escuro
          </button>

          <div className="div-acessibility"></div>

          {OPCOESFILTRO.map((nome) => (
            <button
              key={nome}
              type="button"
              className={`acessItem ${filter === nome ? "ativo" : ""}`}
              onClick={() => setfilter(filter === nome ? null : nome)}
            >
              {nome}
            </button>
          ))}

          <div className="div-acessibility"></div>

          <button type="button" className="acessItem" onClick={reset}>
            ↺ Restaurar cores padrão
          </button>


        </div>
      )}
    </div>
  );
}
