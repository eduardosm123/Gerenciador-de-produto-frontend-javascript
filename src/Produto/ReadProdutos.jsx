import React from "react"
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { definirProdutoFormUpdateAndReadInicial, limparFormularioDeProdutoUpdateAndRead } from "../redux/reducers/produtoSlice";
import { getProdutoById } from "../api/produto";
import { useNavigate } from "react-router-dom";
function ReadProduto() {


    const data = useSelector((state) => state.produto.produtoForm.updateAndRead)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { id } = useParams();

    useEffect(() => {
        async function getProdutoByIdLocal() {
            try {
                const res = await getProdutoById(id);
                dispatch(definirProdutoFormUpdateAndReadInicial(res.data))
            } catch (error) {
                console.log(error)
            }
        }
        getProdutoByIdLocal()
    }, []);

    const voltar = (event) => {
        event.preventDefault();
        dispatch(limparFormularioDeProdutoUpdateAndRead())
        navigate("/categoria")
    }
    return (
        <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
            <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
                <h3>Detalhe do Produto</h3>
                <div className="mb-2">
                    <strong>ID: {data._id}</strong>
                </div>
                <div className="mb-2">
                    <strong>Nome: {data.name}</strong>
                </div>
                <div className="mb-2">
                    <strong>Preço: {data.price}</strong>
                </div>
                <div className="mb-2">
                    <strong>Descrição: {data.description}</strong>
                </div>
                <div className="mb-2">
                    <strong>Categoria: {data.category.name}</strong>
                </div>
                <div className="mb-2">
                    <strong>Data de criação: {data.createdAt}</strong>
                </div>
                <div className="mb-2">
                    <strong>Data de Atualização: {data.updatedAt}</strong>
                </div>
                <Link to={`/produtos/update/${id}`} className="btn btn-success">Editar</Link>
                <button onClick={voltar} className="btn btn-primary ms-3">Voltar</button>
            </div>
        </div>
    )
}

export default ReadProduto;