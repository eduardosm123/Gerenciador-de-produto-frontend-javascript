import React from "react"
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UpdateCategoria() {
    const [data, setData] = useState({
        _id: '',
        name: '',
        createdAt: '',
        updatedAt: '',
        __v: ''
    })

    const { id } = useParams();
    
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:3000/api/category/' + id)
            .then(res => {
                console.log(res.data)
                setData(res.data)
            })
            .catch(err => console.log(err));
    }, []);

    const handleUpdate = (event) => {
        event.preventDefault()
        axios.put('http://localhost:3000/api/category/' + id, { name: data.name }).
            then(res =>  {
                console.log(res);
                navigate("/categoria")
            }).
            catch(err => console.log(err))
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
                            onChange={e =>  setData({ ...data, name: e.target.value })}
                            value={data.name} />
                    </div>
                    <button className="btn btn-success">Atualizar</button>
                    <Link to={"/categoria"} className="btn btn-primary ms-3">Voltar</Link>
                </form>
            </div>
        </div>
    )
}

export default UpdateCategoria;