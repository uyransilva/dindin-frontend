import React from 'react';
import './addRegister.css'
import fecharImg from '../../assets/fechar.svg'
import api from '../../services/api'
import { useState, useEffect } from 'react';
import { getItem } from '../../utils/storage'

function AddRegister({ onClose, categories, setEditTrans, editTrans, transactions, setTransactions, balance }) {
    const [type, setType] = useState(false)
    const [form, setForm] = useState({ valor: '', tipo: '', categoria_id: '', descricao: '', data: '' });
    const verificar = editTrans ? true : false;
    const token = getItem('token');
    const headers = { Authorization: `Bearer ${token}` }

    useEffect(() => {
        if (editTrans) {
            setForm({ ...editTrans })
        }

        return () => { balance() }
    }, [])

    function handleChangeInput(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            console.log(form);
            if (verificar) {
                form.tipo = type ? 'Entrada' : 'Saída';
                const responsePut = await api.put(`/transacao/${form.id}`, { ...form }, { headers })
                const responseGet = await api.get('/transacao', { headers })
                setTransactions([...responseGet.data])
                clearForm()
                return;
            }
            form.tipo = type ? 'Entrada' : 'Saída';
            const response = await api.post(`/transacao`, { ...form }, { headers });
            setTransactions([...transactions, response.data[0]]);
            clearForm()
            return;
        } catch (error) {
            console.log(error)
        }
    }

    function clearForm() {
        setForm({ valor: '', tipo: '', categoria_id: '', descricao: '', data: '' })
        setEditTrans(false)
        onClose(false)
    }
    return (
        <>
            <div className='ofuscado'></div>
            <div className='add-register'>
                <div className='add-register--header'>
                    <h2>{form.valor !== '' ? 'Editar Registro' : 'Adicionar Registro'}</h2>
                    <img
                        onClick={() => clearForm()}
                        src={fecharImg} />
                </div>
                <div className='add-register--options'>
                    <button
                        onClick={() => setType(true)}
                        className={type ? 'btn-option btn-click-input' : 'btn-option btn-input'}>Entrada</button>
                    <button
                        onClick={() => setType(false)}
                        className={type ? 'btn-option btn-output' : 'btn-option btn-click-output'}>Saída</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <label>Valor</label>
                    <input type="text"
                        name='valor'
                        onChange={handleChangeInput}
                        value={form.valor} />
                    <label>Categoria</label>
                    <select name="categoria_id" value={form.categoria_id} id="categoria" onChange={handleChangeInput}>
                        <option>Selecione uma categoria</option>
                        {categories.map((item) => {
                            return <option
                                key={item.id}
                                value={item.id}>
                                {item.descricao}
                            </option>
                        })}
                    </select>
                    <label>Data</label>
                    <input type="date" placeholder='dd/mm/aaaa' value={form.data} onChange={handleChangeInput} name='data' />
                    <label>Descrição</label>
                    <input type="text" value={form.descricao} name='descricao' onChange={handleChangeInput} />
                    <button>Confirmar</button>
                </form>
            </div>
        </>
    )
}

export default AddRegister;