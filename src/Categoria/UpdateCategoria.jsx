import React from "react"
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { definirCategoriaFormUpdateAndReadInicial, definirCategoriaFormUpdateAndReadName, limparFormularioUpdateAndRead } from "../redux/reducers/categoriaSlice";
import { getCategoriaById, updateCategory } from "../api/categoria";
import ButtonBack from "../components/ButtonBack";
import ButtonAplicar from "../components/ButtonAplicar";


function UpdateCategoria() {

    const data = useSelector((state) => state.categoria.categoriaForm.updateAndRead)
    const { id } = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        async function getCategoriaLocal() {
            try {
                const res = await getCategoriaById(id);
                dispatch(definirCategoriaFormUpdateAndReadInicial(res.data))
            } catch (error) {
                console.log(error);
            }
        }
        getCategoriaLocal();
    }, []);

    const handleUpdate = (event) => {
        event.preventDefault()  
        async function updateCategoriaLocal() {
            try {
                await updateCategory(id, { name: data.name });
                dispatch(limparFormularioUpdateAndRead())
                navigate("/categoria")
            } catch (error) {
                console.log(error);
            }
        }
        updateCategoriaLocal();
    }
    return (
        <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
            <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
                <h1>Editar Categoria</h1>
                <form onSubmit={handleUpdate}>
                    <div className="mb-2 d-flex flex-column">
                        <label htmlFor="name">Nome da categoria:</label>
                        <input type="text"
                            name="name"
                            className="form-control"
                            placeholder="Digite o nome da categoria"
                            onChange={e => dispatch(definirCategoriaFormUpdateAndReadName(e.target.value))}
                            value={data.name} />
                    </div>  

                     <div className='row'>
                        <div className="col-md-5 col-lg-3 col-sm-5 m-1"><ButtonAplicar msg="Editar" /></div>
                        <div className="col-md-5 col-lg-3 col-sm-5 m-1">
                            <Link  to={"/categoria"} className="btn btn-primary w-100" >Voltar</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateCategoria;