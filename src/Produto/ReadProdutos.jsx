import React from "react"
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function ReadProduto() {
    const [data, setData] = useState({
        _id: String,
        name: String,
        price: Number,
        description: String,
        category:  {
            name: String,
            _id: String,
            createdAt: String,
            updatedAt: String
        },
        createdAt: String,
        updatedAt: String,
        __v: Number
    })

    const { id } = useParams();

    useEffect(() => {
        axios.get('http://localhost:3000/api/product/' + id)
            .then(res => {
                console.log(res.data)
                setData(res.data)
            })
            .catch(err => console.log(err));
    }, []);
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
                <Link to={`/produtos`} className="btn btn-primary ms-3">Voltar</Link>
            </div>
        </div>
    )
}

export default ReadProduto;