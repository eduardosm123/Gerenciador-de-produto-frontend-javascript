import axios from "axios";
import React from "react"
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function ListProdutos() {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/api/product/${page}&10`)
            .then(res => { 
                setData(res.data.product);
                setTotalPages(res.data.totalPages);
            })
            .catch(err => console.log(err))
    }, [page]);
    
   
    const handleDelete = (id) => {
        const confirm = window.confirm("Você tem certeza que quer deletar?")
        if (confirm) {
            axios.delete('http://localhost:3000/api/product/' + id).
                then(res => { 
                    location.reload()
                }).
                catch(err => console.log(err));
        }
    }

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
            <h1>Lista de Produtos</h1>
            <div className="w-75 rounded bg-white border shadow p-4">
                <div className="d-flex  justify-content-end">
                    <div className="d-flex justify-content-end">
                        <Link to="/produtos/create" className="btn btn-success">Adicionar Produto</Link>
                    </div>
                    <div className="d-flex justify-content-end">
                        <Link to="/" className="btn btn-primary ms-3">Voltar</Link>
                    </div>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Preço</th>
                            <th>Descrição</th>
                            <th>Categoria</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? data.map((registro, key) => (
                            <tr key={key}>
                                <td>{registro._id}</td>
                                <td>{registro.name}</td>
                                <td>{registro.price}</td>
                                <td>{registro.description}</td>
                                <td>{registro.category.name}</td>
                                <td>
                                    <Link to={`/produtos/read/${registro._id}`} className="btn btn-sm btn-info me-2">Ler</Link>
                                    <Link to={`/produtos/update/${registro._id}`} className="btn btn-sm btn-primary me-2">Edição</Link>
                                    <button onClick={e => handleDelete(registro._id)} className="btn btn-sm btn-danger">Delete</button>
                                </td>
                            </tr>

                        ))
                            :
                            (<h1>Ainda nenhum registro cadastrado</h1>)}
                    </tbody>
                </table>
                <div className="d-flex justify-content-between mt-3">
                    <button onClick={handlePreviousPage} className="btn btn-secondary" disabled={page === 1}>Anterior</button>
                    <span>Página {page} de {totalPages}</span>
                    <button onClick={handleNextPage} className="btn btn-secondary" disabled={page === totalPages}>Próxima</button>
                </div>
            </div>
        </div>
    )
}

export default ListProdutos;