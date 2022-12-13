import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import avatarImg from '../../assets/avatar.svg'
import filtrarImg from '../../assets/filtrar.svg'
// import editarImg from '../../assets/canetinha.svg'
// import excluirImg from '../../assets/lixeira.svg'
// import setaCima from '../../assets/setacima.svg'
import logoDindin from '../../assets/logo.svg'
import sairImg from '../../assets/sair.svg'
import AddRegister from '../../components/AddRegister/AddRegister.jsx'
import TableResumo from '../../components/TableResumo/Index'
import UserCard from '../../components/UserCard/UserCard'
import TableTransacoes from '../../components/TableTransacoes/Index'
import api from '../../services/api'
import { clearAll, getItem } from '../../utils/storage'
import '../Styles/autenticated.css'
import '../Styles/commom.css'
import './style.css'
var exports = {};


function Home() {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        nome: ''
    })
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [modalTrans, setModalTrans] = useState(false);
    const [modalUser, setModalUser] = useState(false);
    const [resumo, setResumo] = useState({ entrada: '', saida: '' })
    const [editTrans, setEditTrans] = useState('')
    const token = getItem('token');
    const headers = { Authorization: `Bearer ${token}` }
    async function handleList() {
        try {
            const responseUser = await api.get('/usuario', {
                headers
            });
            // console.log(responseUser)
            const responseTransactions = await api.get('/transacao', {
                headers
            });
            // console.log(responseTransactions)
            const responseCategories = await api.get('/categorias', {
                headers
            });
            // console.log(responseCategories)

            // console.log(responseExtrato)
            setUser({ ...responseUser.data[0] })
            setTransactions(responseTransactions.data)
            setCategories(responseCategories.data)


        } catch (error) {
            console.log(error);
        }
    }
    function logOut() {
        clearAll();
        return navigate('/login')

    }

    useEffect(() => {
        handleList();

    }, []);

    async function balance() {
        try {
            const responseExtrato = await api.get('/transacao/extrato', {
                headers
            });
            setResumo({ ...responseExtrato.data })
        } catch (error) {

        }
    }

    useEffect(() => {
        balance();

    }, [transactions]);

    function handleEditTrans(edit) {
        setEditTrans(edit);
        setModalTrans(true);
    }
    function handleEditUser(edit) {
        setEditUser(edit);
        setModalUser(true);
    }

    return (
        <div
            className='container-home'>
            {modalTrans && <AddRegister
                onClose={setModalTrans}
                categories={categories}
                editTrans={editTrans}
                setEditTrans={setEditTrans}
                transactions={transactions}
                setTransactions={setTransactions}
                balance={balance}
            />
            }
            {modalUser && <UserCard
                onCloseUser={setModalUser}
                user={user}
                setUser={setUser}
            />
            }
            <header>
                <img
                    src={logoDindin} alt="logotipo marca" />
                <div
                    className='usuario'>
                    <img src={avatarImg} alt="foto do usuário"
                        onClick={() => setModalUser(true)} />
                    <h3>{user.nome}</h3>
                    <button><img src={sairImg} alt="clique para logout"
                        onClick={() => logOut()} /></button>
                </div >
            </header >
            <div className='main'>
                <div className='top'>
                    <div className='filtro'>
                        <button><img src={filtrarImg} alt="filtrar" />Filtrar</button>
                    </div>
                </div>
                <div className='section-main'>
                    <div className='section-left'>
                        <div className='transacoes-main'>
                            <div className='descricoes'>
                                <TableTransacoes transactions={transactions}
                                    setModalTrans={setModalTrans}
                                    handleEditTrans={handleEditTrans}
                                    setTransactions={setTransactions}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='section-right'>
                        <TableResumo
                            resumo={resumo} />
                        <div className='add-registro'>
                            <button
                                onClick={() => setModalTrans(true)}
                                className='btn-add'>Adicionar Registro</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Home