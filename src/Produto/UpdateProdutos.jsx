import React from "react"
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UpdateProdutos() {

    const [data, setData] = useState({
        _id: '',
        name: '',
        price: 0,
        description: '',
        category: {
            name: '',
            _id: '',
            createdAt: '',
            updatedAt: ''
        },
        createdAt: '',
        updatedAt: '',
        __v: 0
    })
    
    const [categorias, setCategorias] = useState([])
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/api/category')
            .then(res => setCategorias(res.data))
            .catch(err => console.log(err))
    }, []);


    useEffect(() => {
        axios.get('http://localhost:3000/api/product/' + id)
            .then(res => {
                console.log(res.data)
                setData(res.data)
            })
            .catch(err => console.log(err));
    }, []);

    const handleUpdate = (event) => {
        event.preventDefault()
        axios.put('http://localhost:3000/api/product/' + id, {
            name: data.name,
            price: data.price,
            description: data.description,
            category: data.category
        }

        ).
            then(res => {
                console.log(res);
                navigate("/produtos")
            }).
            catch(err => console.log(err))
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
                            onChange={e => setData({ ...data, name: e.target.value })} />
                    </div>
                    <div className="mb-2 d-flex flex-column">
                        <label htmlFor="price">Preço do Produtos:</label>
                        <input type="number"
                            name="price"
                            className="form-control"
                            placeholder="Digite o preço"
                            value={data.price}
                            onChange={e => setData({ ...data, price: e.target.value })} />
                    </div>
                    <div className="mb-2 d-flex flex-column">
                        <label htmlFor="description">Descrição do Produtos:</label>
                        <input type="text"
                            name="description"
                            className="form-control"
                            placeholder="Digite a descrição do produto"
                            value={data.description}
                            onChange={e => setData({ ...data, description: e.target.value })} />
                    </div>
                    <div className="mb-2 d-flex flex-column">
                        <label htmlFor="category">Categoria do Produto:</label>
                        <select
                            name="category"
                            className="form-control"
                            onChange={e => setData({ ...data, category: { name: e.target.value } })}>
                            <option value={data.category.name}>{data.category.name}</option>
                            {categorias.map((categoria, index) => (
                                <option key={index} value={categoria.name}>{categoria.name}</option>
                            ))}
                        </select>
                    </div>
                    <button className="btn btn-success">Atualizar</button>
                    <Link to={"/produtos"} className="btn btn-primary ms-3">Voltar</Link>
                </form>
            </div>
        </div>
    )
}

export default UpdateProdutos;