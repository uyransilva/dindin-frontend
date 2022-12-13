import React from 'react'
import { useEffect } from 'react'
import './style.css'
import setaCima from '../../assets/setacima.svg'
import editarImg from '../../assets/canetinha.svg'
import excluirImg from '../../assets/lixeira.svg'
import api from '../../services/api'
import { clearAll, getItem } from '../../utils/storage'
import { useState } from 'react'


function TableResumo({ resumo }) {
    const token = getItem('token');
    const headers = { Authorization: `Bearer ${token}` }
    // const [resumoTable, setResumoTable] = useState({ ...resumo })

    async function handleBalanceTrans() {
        try {
            const response = await api.get('/transacao/extrato', { headers })
        } catch (error) {

        }
    }

    useEffect(() => {
        handleBalanceTrans()
    }, [])


    return (
        <div className='resume'>
            <h2>Resumo</h2>
            <div className='extrato'>
                <div className='entrada'>
                    <span >Entradas</span>
                    <strong className='input-desc'>R${(resumo.entrada / 100).toFixed(2)}</strong>
                </div>
                <div className='saida'>
                    <span >Saidas</span>
                    <strong className='output-desc'>R${(resumo.saida / 100).toFixed(2)}</strong>
                </div>
                <div className='line'></div>
                <div className='saldo'>
                    <span>Saldo</span>
                    <strong className='balance-desc'>R${((resumo.entrada - resumo.saida) / 100).toFixed(2)}</strong>
                </div>
            </div>
        </div>
    )

}

export default TableResumo