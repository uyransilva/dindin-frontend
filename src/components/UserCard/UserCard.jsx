import React, { useEffect, useState } from "react";
import fecharImg from '../../assets/fechar.svg';
import api from '../../services/api';
import { getItem } from "../../utils/storage";
import './style.css';


function UserCard({ user, onCloseUser, setUser }) {
    const [userModal, setUserModal] = useState('');
    const [errorUser, setErrorUser] = useState('')
    const [form, setForm] = useState({ ...user })
    const token = getItem('token');
    const headers = { Authorization: `Bearer ${token}` }

    console.log(form);
    async function handleUserModal(e) {
        e.preventDefault();
        try {
            if (!form.email || !form.nome || !form.password || !form.confirmPassword) {
                setErrorUser('Preencha todos os campos')
                return;
            }
            if (form.password != form.confirmPassword) {
                setErrorUser('As senhas não são iguais')
                return;
            }
            const response = await api.put(`/usuario/${user.id}`, {
                nome: form.nome,
                email: form.email,
                senha: form.password

            }, { headers });
            // setForm([...users, response.data])
            setUser({
                id: user.id,
                nome: form.nome,
                email: form.email
            })
            onCloseUser(false)
        } catch (error) {
            console.log(error);
        }
    }
    function handleChangeInput(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="ofuscado"></div>
            <div
                className="add-register">
                <div className="add-register--header">
                    <h2>Editar perfil</h2>
                    <img
                        onClick={() => onCloseUser(false)}
                        src={fecharImg} />
                </div>
                <form onSubmit={handleUserModal}>
                    <label>Nome</label>
                    <input type="text"
                        value={form.nome}
                        name='nome'
                        onChange={handleChangeInput}
                    />
                    <label>Email</label>
                    <input type="text"
                        value={form.email}
                        name='email'
                        onChange={handleChangeInput}
                    />
                    <label>Senha</label>
                    <input type="password"
                        value={form.password}
                        name='password'
                        onChange={handleChangeInput} />
                    <label>Confirmação de senha</label>
                    <input type="password"
                        value={form.confirmPassword}
                        name='confirmPassword'
                        onChange={handleChangeInput} />
                    <span className="error-user">{errorUser}</span>
                    <button>Confirmar</button>
                </form>
            </div>
        </>
    )
}

export default UserCard;