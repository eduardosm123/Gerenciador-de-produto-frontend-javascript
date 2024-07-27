import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { definirLista, definirPage, definirTotalPage } from '../redux/reducers/categoriaSlice';
import { deleteCategoria, getCategoriaPaginada } from '../api/categoria';


function ListCategoria() {
    const data = useSelector((state) => state.categoria.categoriasList.lista)
    const totalPages = useSelector((state) => state.categoria.categoriasList.totalPages)
    const page = useSelector((state) => state.categoria.categoriasList.pages)

    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        async function getCategoria() {
            try {
                const resposta = await getCategoriaPaginada(page);
                dispatch(definirLista(resposta.data.categories))
                dispatch(definirTotalPage(resposta.data.totalPages))
            } catch (error) {
                console.log(error)
            }

        }
        getCategoria()
    }, [page]);


    const handleDelete = (id) => {
        const confirm = window.confirm("Você tem certeza que quer deletar?");
        if (confirm) {
            async function deleteCategoriaLocal() {
                try {
                    await deleteCategoria(id)
                    window.location.reload();
                } catch (error) {
                    console.log(error);
                }
            }
            deleteCategoriaLocal()
        }
    }

    const handlePreviousPage = () => {
        if (page > 1) {
            dispatch(definirPage(page - 1))
        }
    }

    const handleNextPage = () => {
        if (page < totalPages) {
            dispatch(definirPage(page + 1))
        }
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
            <h1>Lista de Categorias</h1>
            <div className="w-75 rounded bg-white border shadow p-4">
                <div className="d-flex justify-content-end mb-3">
                    <Link to="/categoria/create" className="btn btn-success">Adicionar categoria</Link>
                    <Link to="/" className="btn btn-primary ms-3">Voltar</Link>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? data.map((registro, key) => (
                            <tr key={key}>
                                <td>{registro._id}</td>
                                <td>{registro.name}</td>
                                <td>
                                    <Link to={`/categoria/read/${registro._id}`} className="btn btn-sm btn-info me-2">Ler</Link>
                                    <Link to={`/categoria/update/${registro._id}`} className="btn btn-sm btn-primary me-2">Editar</Link>
                                    <button onClick={() => handleDelete(registro._id)} className="btn btn-sm btn-danger">Deletar</button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="3">Ainda nenhum registro cadastrado</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="d-flex justify-content-between mt-3">
                    <button onClick={handlePreviousPage} className="btn btn-secondary" disabled={page === 1}>Anterior</button>
                    <span>Página {page} de {totalPages}</span>
                    <button onClick={handleNextPage} className="btn btn-secondary" disabled={page === totalPages}>Próxima</button>
                </div>
            </div>
        </div>
    );
}

export default ListCategoria;
