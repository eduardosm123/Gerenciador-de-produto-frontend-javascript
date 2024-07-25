import React from "react"
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
function ReadCategoria() {
    const [data, setData] = useState({
        _id: "",
        name: "",
        createdAt: "",
        updatedAt: "",
        __v: 0
    })

    const { id } = useParams();

    useEffect(() => {
        axios.get('http://localhost:3000/api/category/' + id)
            .then(res => {
                console.log(res.data)
                setData(res.data)
            })
            .catch(err => console.log(err));
    }, []);
    return (
        <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
            <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
                <h3>Detalhe da Categoria</h3>
                <div className="mb-2">
                    <strong>ID: {data._id}</strong>
                </div>
                <div className="mb-2">
                    <strong>Nome: {data.name}</strong>
                </div>
                <div className="mb-2">
                    <strong>Data de criação: {data.createdAt}</strong>
                </div>
                <div className="mb-2">
                    <strong>Data de Atualização: {data.updatedAt}</strong>
                </div>
                <Link to={`/categoria/update/${id}`} className="btn btn-success">Editar</Link>
                <Link to={`/categoria`} className="btn btn-primary ms-3">Voltar</Link>
            </div>
        </div>
    )
}

export default ReadCategoria;