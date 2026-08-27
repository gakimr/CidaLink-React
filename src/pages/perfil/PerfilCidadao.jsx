import { useState } from 'react';
import './PerfilCidadao.css';

const DADOS_INICIAIS = {
  nome: 'Rihanna Oliveira',
  cpf: '123.456.789-00',
  email: 'rihanna@email.com',
  bairro: 'Centro',
  rua: 'Rua General Osório',
  latitude: '-21.4033',
  longitude: '-48.6547',
};

const OCORRENCIAS_CIDADAO = [
  { id: 1, tipo: 'Buraco na Rua', bairro: 'Centro', status: 'pendente' },
  { id: 2, tipo: 'Iluminação Pública', bairro: 'Centro', status: 'andamento' },
  { id: 3, tipo: 'Acúmulo de Lixo', bairro: 'Vila Negri', status: 'resolvido' },
];

function PerfilCidadao() {
  const [editando, setEditando] = useState(false);
  const [dados, setDados] = useState(DADOS_INICIAIS);

  function handleChange(campo, valor) {
    setDados((anterior) => ({ ...anterior, [campo]: valor }));
  }

  function handleSalvar(event) {
    event.preventDefault();
    console.log('Dados salvos (visual, sem API ainda):', dados);
    setEditando(false);
  }

  const totalPendentes = OCORRENCIAS_CIDADAO.filter((o) => o.status === 'pendente').length;
  const totalAndamento = OCORRENCIAS_CIDADAO.filter((o) => o.status === 'andamento').length;
  const totalResolvidas = OCORRENCIAS_CIDADAO.filter((o) => o.status === 'resolvido').length;

  return (
    <>
      <h1>Meu Perfil</h1>

      <section className="card-perfil">
        <form onSubmit={handleSalvar}>
          <div className="perfil-topo">
            <div className="perfil-foto-box">
              <img
                className="foto-perfil"
                src="https://placehold.co/100x100/A0E0A0/000?text=CidaLink"
                alt="Foto de Perfil"
              />
              <h2>{dados.nome}</h2>
              <span className="selo-ativo">Cidadão Ativo</span>
            </div>

            <div className="perfil-dados-box">
              <div className="perfil-header">
                <h2>Dados Cadastrais</h2>
                <button
                  className="btnEditar"
                  type="button"
                  onClick={() => setEditando((atual) => !atual)}
                >
                  {editando ? 'Cancelar' : 'Editar'}
                </button>
              </div>

              <div className="dados-grid">
                <div className="inputgp">
                  <label htmlFor="nome">Nome Completo</label>
                  <input
                    id="nome"
                    type="text"
                    disabled={!editando}
                    value={dados.nome}
                    onChange={(e) => handleChange('nome', e.target.value)}
                  />
                </div>

                <div className="inputgp">
                  <label htmlFor="cpf">CPF</label>
                  <input
                    id="cpf"
                    type="text"
                    disabled={!editando}
                    value={dados.cpf}
                    onChange={(e) => handleChange('cpf', e.target.value)}
                  />
                </div>

                <div className="inputgp">
                  <label htmlFor="email">E-mail</label>
                  <input
                    id="email"
                    type="email"
                    disabled={!editando}
                    value={dados.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                </div>

                <div className="inputgp">
                  <label htmlFor="bairro">Bairro</label>
                  <input
                    id="bairro"
                    type="text"
                    disabled={!editando}
                    value={dados.bairro}
                    onChange={(e) => handleChange('bairro', e.target.value)}
                  />
                </div>

                <div className="inputgp">
                  <label htmlFor="rua">Rua</label>
                  <input
                    id="rua"
                    type="text"
                    disabled={!editando}
                    value={dados.rua}
                    onChange={(e) => handleChange('rua', e.target.value)}
                  />
                </div>

                <div className="inputgp">
                  <label htmlFor="latitude">Latitude</label>
                  <input
                    id="latitude"
                    type="text"
                    disabled={!editando}
                    value={dados.latitude}
                    onChange={(e) => handleChange('latitude', e.target.value)}
                  />
                </div>

                <div className="inputgp">
                  <label htmlFor="longitude">Longitude</label>
                  <input
                    id="longitude"
                    type="text"
                    disabled={!editando}
                    value={dados.longitude}
                    onChange={(e) => handleChange('longitude', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {editando && (
            <button className="btnCadastro" type="submit" style={{ marginTop: '1.5rem' }}>
              Salvar Alterações
            </button>
          )}
        </form>
      </section>

      <section className="card-status">
        <h2>Resumo das Ocorrências</h2>
        <div className="cards-status-perfil">
          <div className="status-card vermelho">
            <strong>{totalPendentes}</strong>
            <span className="span-vermelho">Pendentes</span>
          </div>
          <div className="status-card amarelo">
            <strong>{totalAndamento}</strong>
            <span className="span-amarelo">Em Andamento</span>
          </div>
          <div className="status-card verde">
            <strong>{totalResolvidas}</strong>
            <span className="span-verde">Resolvidas</span>
          </div>
        </div>
      </section>

      <section className="card-lista-ocorrencias">
        <h2>Minhas Ocorrências Reportadas</h2>
        <div className="lista-ocorrencias">
          {OCORRENCIAS_CIDADAO.map((ocorrencia) => (
            <div className="item-ocorrencia" key={ocorrencia.id}>
              <div>
                <strong>{ocorrencia.tipo}</strong> — {ocorrencia.bairro}
              </div>
              <span className={`status-tag status-${ocorrencia.status}`}>
                {ocorrencia.status === 'pendente' && 'PENDENTE'}
                {ocorrencia.status === 'andamento' && 'EM ANDAMENTO'}
                {ocorrencia.status === 'resolvido' && 'RESOLVIDO'}
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default PerfilCidadao;