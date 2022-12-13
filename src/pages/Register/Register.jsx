import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logoDindin from '../../assets/logo.svg';
import api from '../../services/api';
import { getItem, setItem } from '../../utils/storage'
import './register.css';

function Register() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [currentUser, setCurrentUser] = useState(null)
  const navigate = useNavigate()
  const token = getItem('token')
  function handleChangeInputValue(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault('Submit');
    try {
      if (!form.email || !form.name || !form.password || !form.confirmPassword) {
        window.alert('Preencha todos os campos!')
        return;
      }
      if (form.password != form.confirmPassword) {
        window.alert('As senhas não são iguais!')
        return;
      }
      const response = await api.post('/usuario', {
        nome: form.name,
        email: form.email,
        senha: form.password
      });
      setUsers([...users, response.data])
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <header>
        <img src={logoDindin} />
      </header>
      <div className='singup'>
        <div className='register-div'>
          <h2>Cadastre-se</h2>
          <form onSubmit={handleSubmit}>
            <label>Nome</label>
            <input type="text"
              name='name'
              onChange={(e) => handleChangeInputValue(e)}
            />
            <label>Email</label>
            <input type="text"
              name='email'
              onChange={(e) => handleChangeInputValue(e)}
            />
            <label>Senha</label>
            <input type="password"
              name='password'
              onChange={(e) => handleChangeInputValue(e)}
            />
            <label>Confirmação de senha</label>
            <input type="password"
              name='confirmPassword'
              onChange={(e) => handleChangeInputValue(e)}
            />
            <button className='btn-register'>Cadastrar</button>
            <span>Já tem cadastro? <Link to='/login'>Clique aqui!</Link></span>
          </form>
        </div>

      </div>
    </div>
  )
}

export default Register
