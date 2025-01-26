import axios from "axios";
import React from "react"
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { definirListaProdutos, definirTotalPageProdutos, definirPageProdutos } from "../redux/reducers/produtoSlice";
import { deleteProduto, getProdutoPaginado } from "../api/produto";
import ButtonBack from "../components/ButtonBack";
import ButtonRead from "../components/ButtonRead";
import ButtonDelete from "../components/ButtonDelete";




function ListProdutos() {

    const data = useSelector((state) => state.produto.produtosList.lista)
    const totalPages = useSelector((state) => state.produto.produtosList.totalPages)
    const page = useSelector((state) => state.produto.produtosList.pages)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        async function getProductProdutosLocal() {
            try {
                const res = await getProdutoPaginado(page)
                dispatch(definirListaProdutos(res.data.product))
                dispatch(definirTotalPageProdutos(res.data.totalPages))
            } catch (error) {
                console.log(error)
            }
        }
        getProductProdutosLocal()
    }, [page]);


    const handleDelete = (id) => {
        const confirm = window.confirm("Você tem certeza que quer deletar?")
        if (confirm) {
            async function deleteProdutoLocal() {
                try {
                    await deleteProduto(id)
                    window.location.reload();
                } catch (error) {
                    console.log(error);
                }
            }
            deleteProdutoLocal()
        }
    }

    const handlePreviousPage = () => {
        if (page > 1) {
            dispatch(definirPageProdutos(page - 1))
        }
    }

    const handleNextPage = () => {
        if (page < totalPages) {
            dispatch(definirPageProdutos(page + 1))
        }
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center  ">
            <h1>Lista de Produtos</h1>
            <div className="w-75 rounded bg-white border shadow p-4">
                <div className="d-flex  justify-content-end">
                    <div className="d-flex justify-content-end">
                        <Link to="/produtos/create" className="btn btn-success">Adicionar Produto</Link>
                    </div>
                    <div className="d-flex justify-content-end">
                        <ButtonBack link="/" />
                    </div>
                </div>
                <div className="table-responsive mt-1">
                    <table className="table table-striped table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Preço</th>
                                <th>Descrição</th>
                                <th>Categoria</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? data.map((registro, key) => (
                                <tr key={key}>
                                    <td>{registro._id}</td>
                                    <td>{registro.name}</td>
                                    <td>{registro.price}</td>
                                    <td>{registro.description}</td>
                                    <td>{registro.category.name}</td>
                                    <td className="d-flex justify-content-between">
                                        <ButtonRead id={registro._id} link={'/produtos/read'} />
                                        <Link to={`/produtos/update/${registro._id}`} className="btn btn-sm btn-primary me-2">Edição</Link>
                                        <ButtonDelete func={e => handleDelete(registro._id)} />
                                    </td>
                                     
                                </tr>

                            ))
                                :
                                (<h1>Ainda nenhum registro cadastrado</h1>)}
                        </tbody>
                    </table>
                </div>

                <div className="d-flex justify-content-between mt-3">
                    <button onClick={handlePreviousPage} className="btn btn-secondary" disabled={page === 1}>Anterior</button>
                    <span>Página {page} de {totalPages}</span>
                    <button onClick={handleNextPage} className="btn btn-secondary" disabled={page === totalPages}>Próxima</button>
                </div>
            </div>
        </div>
    )
}

export default ListProdutos;