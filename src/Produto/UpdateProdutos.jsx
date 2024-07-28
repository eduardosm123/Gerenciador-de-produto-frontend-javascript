import React from "react"
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { definirLista } from '../redux/reducers/categoriaSlice';
import {
    definirProdutoFormUpdateAndReadInicial,
    limparFormularioDeProdutoUpdateAndRead,
    definirProdutoFormUpdateAndRead,
    definirCategoriaDoProdutorFormUpdateAndRead
} from "../redux/reducers/produtoSlice";
import { getCategoria } from "../api/categoria";
import { getProdutoById, updateProduto } from "../api/produto";
import ButtonAplicar from "../components/ButtonAplicar";




function UpdateProdutos() {
    const data = useSelector((state) => state.produto.produtoForm.updateAndRead)
    const dispatch = useDispatch()
    const categorias = useSelector((state) => state.categoria.categoriasList.lista)
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function getCategoriaLocal() {
            try {
                const res = await getCategoria()
                dispatch(definirLista(res.data))
            } catch (error) {
                console.log(error)
            }
        }
        getCategoriaLocal()
    }, []);

    useEffect(() => {
        async function getProdutoLocal() {
            try {
                const res = await getProdutoById(id)
                dispatch(definirProdutoFormUpdateAndReadInicial(res.data))
            } catch (error) {
                console.log(error)
            }
        }
        getProdutoLocal()
    }, []);

    const handleUpdate = (event) => {
        event.preventDefault()
        async function atualizar() {
            try {
                await updateProduto(id, {
                    name: data.name,
                    price: data.price,
                    description: data.description,
                    category: data.category
                })
                navigate("/produtos")
            } catch (error) {
                console.log(error)
            }
        }
        atualizar()
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'category') {
            dispatch(definirCategoriaDoProdutorFormUpdateAndRead(value))
        } else {
            dispatch(definirProdutoFormUpdateAndRead({ campo: name, valor: value }));
        }
    }

    return (
        <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
            <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
                <h1>Editar Produto</h1>
                <form onSubmit={handleUpdate} >
                    <div className="mb-2 d-flex flex-column">
                        <label htmlFor="name">Nome do Produtos:</label>
                        <input type="text"
                            name="name"
                            className="form-control"
                            placeholder="Digite o nome da Produtos"
                            value={data.name}
                            onChange={handleChange} />
                    </div>
                    <div className="mb-2 d-flex flex-column">
                        <label htmlFor="price">Preço do Produtos:</label>
                        <input type="number"
                            name="price"
                            className="form-control"
                            placeholder="Digite o preço"
                            value={data.price}
                            onChange={handleChange} />
                    </div>
                    <div className="mb-2 d-flex flex-column">
                        <label htmlFor="description">Descrição do Produtos:</label>
                        <input type="text"
                            name="description"
                            className="form-control"
                            placeholder="Digite a descrição do produto"
                            value={data.description}
                            onChange={handleChange} />
                    </div>
                    <div className="mb-2 d-flex flex-column">
                        <label htmlFor="category">Categoria do Produto:</label>
                        <select
                            name="category"
                            className="form-control"
                            onChange={handleChange}>
                            <option value={data.category.name}>{data.category.name}</option>
                            {categorias.map((categoria, index) => (
                                <option key={index} value={categoria.name}>{categoria.name}</option>
                            ))}
                        </select>
                    </div>

                    <ButtonAplicar msg="Atualizar" />
                    <Link to={"/produtos"} className="btn btn-primary ms-3">Voltar</Link>
                </form>
            </div>
        </div>
    )
}

export default UpdateProdutos;