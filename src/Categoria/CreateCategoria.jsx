import React from "react"
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { definirCategoriaFormCreate, limparFormularioCreate } from "../redux/reducers/categoriaSlice";
import { postCategoria } from "../api/categoria";
import ButtonBack from "../components/ButtonBack";
import ButtonAplicar from "../components/ButtonAplicar";


function CreateCategoria() {
    const values = useSelector((state)=> state.categoria.categoriaForm.create)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    
    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            postCategoria(values)
            dispatch(limparFormularioCreate())
            navigate("/categoria")
        }  catch (error) {
            console.log(error)
        }
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
                    <ButtonAplicar msg="Cadastrar"/>
                    <ButtonBack link={"/categoria"}/>
                </form>
            </div>
        </div>
    )
}

export default CreateCategoria;