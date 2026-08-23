import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function LoginAdmin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    console.log('Dados do formulário (admin):', { email, senha });
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
            <button className="btnEntrar" type="submit">Entrar</button>
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