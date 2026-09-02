import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api, salvarSessao } from '../../services/api';
import './Login.css';

function LoginAdmin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setMensagem(''); setCarregando(true);
    try {
      const resposta = await api('/auth/login', { method: 'POST', body: JSON.stringify({ email, password: senha }) });
      salvarSessao(resposta.data, 'admin');
      navigate('/admin');
    } catch (erro) { setMensagem(`${erro.message} Verifique se o backend está ativo na porta 3000.`); }
    finally { setCarregando(false); }
  }

  return (
    <main className="cardForm">
      <div className="cardlogin">
        <h2>Entrar no CidaLink</h2>
        <h3>Administrador</h3>

        <form onSubmit={handleSubmit}>
          <div className="inputgp">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
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

          <div className="ptlogin">
            {mensagem && <p className="login-mensagem">{mensagem}</p>}
            <button className="btnEntrar" type="submit" disabled={carregando}>{carregando ? 'Entrando...' : 'Entrar'}</button>
          </div>
        </form>

        <div className="ptlogin">
          <Link className="rsenha" to="/recuperar-senha">Esqueceu a senha?</Link>
        </div>
        <div className="ptlogin">
          <p>Ainda não tem uma conta?</p>
          <Link className="btnCd" to="/cadastro/administrador">Cadastre-se</Link>
        </div>
      </div>
    </main>
  );
}

export default LoginAdmin;
