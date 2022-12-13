import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logoDindin from '../../assets/logo.svg'
import api from '../../services/api'
import { getItem, setItem } from '../../utils/storage'
import './login.css'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorLogin, setErrorLogin] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (!email || !password) {
        setErrorLogin('Preencha todos os campos')
        return;
      }
      const response = await api.post('/login', {
        email, senha: password
      });
      console.log(response.data);
      const { token } = response.data;
      setItem('token', token);
      navigate('/home')
      return
    } catch (error) {

      setErrorLogin(error.response.data.mensagem)
    }
  }

  return (
    <div className="container">
      <header>
        <img src={logoDindin} />
      </header>
      <div className='login'>

        <div className='register'>
          <h1>Controle suas <span className='color-purple'>finanças</span>,
            sem planilha chata.</h1>
          <p>Organizar as suas finanças nunca foi tão fácil, com o DINDIN,
            você tem tudo num único lugar e em um clique de distância.</p>
          <Link
            className='link-register'
            to="/register"><button className='btn-register'>Cadastre-se</button></Link>
        </div>

        <div className='singin'>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              name='email'
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              name='password'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className='login-error'>{errorLogin}</span>
            <button>Entrar</button>
          </form>
        </div>

      </div>
    </div>
  )
}

export default Login
