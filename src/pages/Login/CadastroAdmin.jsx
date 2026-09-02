import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import './Login.css';

function CadastroAdmin() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem.');
      return;
    }

    try {
      await api('/users/registeradm', { method: 'POST', body: JSON.stringify({ name: nome, cpf: cpf.replace(/\D/g, ''), email, password: senha }) });
      setMensagem('Cadastro realizado com sucesso. Redirecionando para o login...');
      setTimeout(() => navigate('/loginadm'), 700);
    } catch (erro) { setMensagem(erro.message); }
  }

  return (
    <main className="cardcadastro">
      <h2>Cadastro Administrador</h2>
      <form onSubmit={handleSubmit}>
        <div className="inputgp">
          <label className="obrigatorio" htmlFor="nome">Nome Completo</label>
          <input
            id="nome"
            type="text"
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div className="inputgp">
          <label className="obrigatorio" htmlFor="cpf">CPF</label>
          <input
            id="cpf"
            type="text"
            maxLength={14}
            required
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
        </div>
        <div className="inputgp">
          <label className="obrigatorio" htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="inputgp">
          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            type="password"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        <div className="inputgp">
          <label htmlFor="csenha">Confirmar Senha</label>
          <input
            id="csenha"
            type="password"
            required
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />
        </div>

        {mensagem && <p className="login-mensagem">{mensagem}</p>}
        <button className="btnCadastro" type="submit">Cadastrar</button>
      </form>

      <div className="ptlogin">
        <p>Já possui uma conta?</p>
        <Link className="btnCd" to="/loginadm">Login</Link>
      </div>
    </main>
  );
}

export default CadastroAdmin;
