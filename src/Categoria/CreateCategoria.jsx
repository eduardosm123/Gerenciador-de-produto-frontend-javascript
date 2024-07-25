import React from "react"
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function CreateCategoria() {

    const [values, setValue] = useState({
        name: ''
    })

    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/api/category', values).
            then(res =>  {
                console.log(res);
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
                            onChange={e => setValue({ ...values, name: e.target.value })} />
                    </div>
                    <button className="btn btn-success">Cadastrar</button>
                    <Link to={"/categoria"} className="btn btn-primary ms-3">Voltar</Link>
                </form>
            </div>
        </div>
    )
}

export default CreateCategoria;