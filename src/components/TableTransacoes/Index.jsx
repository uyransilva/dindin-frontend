import setaCima from '../../assets/setacima.svg'
import setaBaixo from '../../assets/seta-baixo.svg'
import canetaImg from '../../assets/canetinha.svg'
import excluirImg from '../../assets/lixeira.svg'
import './style.css'
import api from '../../services/api'
import { clearAll, getItem } from '../../utils/storage'
import { useState } from 'react'
import { useEffect } from 'react'

function TableTransacoes({ transactions, setModalTrans, handleEditTrans, setTransactions }) {
    const token = getItem('token');
    const headers = { Authorization: `Bearer ${token}` }
    const [data, setData] = useState(false);

    async function handleData() {
        let orderBy = '';
        if (data) {
            orderBy = 'desc'
        } else {
            orderBy = 'asc'
        }

        try {
            const responseTransactions = await api.get(`/transacao?orderBy=${orderBy}`, {
                headers
            });
            console.log(responseTransactions);
            setTransactions(responseTransactions.data);
            setData(!data)
        } catch (error) {
            console.log(error);
        }
    }

    function weekDay(date) {
        const formatter = Intl.DateTimeFormat('pt-BR', {

            weekday: 'long'
        })
        return formatter.format(new Date(date))
    }

    function editForm(value) {

    }

    async function handleDeleteTrans(id) {
        try {
            const response = await api.delete(`/transacao/${id}`, { headers });
            const localTrans = [...transactions];
            const index = localTrans.findIndex((element) => element.id == id);
            localTrans.splice(index, 1)
            setTransactions(localTrans)

        } catch (error) {

        }
    }



    // async function listTransactions(){
    //     try {
    //         const responseTransations = await api.get('/transacao', {
    //             headers
    //         })
    //         setTransactions({...responseTransations.data});
    //     } catch (error) {

    //     }
    // }
    // useEffect(() => {
    //     listTransactions();

    // },[])
    return (
        <div>
            <table
                className='trans-table'>
                <thead
                    className='head-row'>
                    <tr>
                        <th className='data' onClick={() => handleData()}>Data<img src={data ? setaCima : setaBaixo} /></th>
                        <th>Dia da semana</th>
                        <th>Descrição</th>
                        <th>Categoria</th>
                        <th>Valor</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody
                    className='body-rows'
                >
                    {transactions.map((row) => (
                        <tr
                            className='lineTable'
                            key={row.id}>
                            <td>{row.data.split('T')[0].split('-').reverse().join('/')}</td>
                            <td>{weekDay(row.data).split('-')[0].toUpperCase()}</td>
                            <td>{row.descricao}</td>
                            <td>{row.tipo.toUpperCase()}</td>
                            <td>{`R$ ${(row.valor / 100).toFixed(2).replace('.', ',')}`}</td>
                            <td>
                                <img
                                    className='editCleanPen'
                                    src={canetaImg}
                                    onClick={() => handleEditTrans(row)}
                                />
                                <img
                                    className='editCleanTresh'
                                    src={excluirImg}
                                    onClick={() => handleDeleteTrans(row.id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableTransacoes