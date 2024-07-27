import React from "react"
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { definirCategoriaFormCreate, limparFormularioCreate } from "../redux/reducers/categoriaSlice";


function CreateCategoria() {
    const values = useSelector((state)=> state.categoria.categoriaForm.create)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/api/category', values).
            then(res => {
                console.log(res);
                dispatch(limparFormularioCreate())
                navigate("/categoria")
            }).
            catch(err => console.log(err))
    }
    
    return (
        <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
            <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
                <h1>Adicionar Categoria</h1>
                <form onSubmit={handleSubmit} >
                    <div className="mb-2 d-flex flex-column">
                        <label htmlFor="name">Nome da categoria:</label>
                        <input type="text"
                            name="name"
                            className="form-control"
                            placeholder="Digite o nome da categoria"
                            onChange={e => dispatch(definirCategoriaFormCreate({ ...values, name: e.target.value }))} />
                    </div>
                    <button className="btn btn-success">Cadastrar</button>
                    <Link to={"/categoria"} className="btn btn-primary ms-3">Voltar</Link>
                </form>
            </div>
        </div>
    )
}

export default CreateCategoria;