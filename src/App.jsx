 
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'

//categoria
import CreateCategoria from './Categoria/CreateCategoria'
import ReadCategoria from './Categoria/ReadCategoria'
import UpdateCategoria from './Categoria/UpdateCategoria'
import ListCategoria from './Categoria/ListCategoria'

//produtos
import CreateProdutos from './Produto/CreateProdutos'
import ListProdutos from './Produto/ListProdutos'

import ReadProduto from './Produto/ReadProdutos'

import UpdateProdutos from './Produto/UpdateProdutos'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() { 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/categoria" element={<ListCategoria />}></Route>
        <Route path="/categoria/create" element={<CreateCategoria />}></Route>
        <Route path="/categoria/read/:id" element={<ReadCategoria />}></Route>
        <Route path="/categoria/update/:id" element={<UpdateCategoria />}></Route>

        <Route path="/produtos" element={<ListProdutos />}></Route>
        <Route path="/produtos/create" element={<CreateProdutos />}></Route>
        <Route path="/produtos/read/:id" element={<ReadProduto />}></Route>
        <Route path="/produtos/update/:id" element={<UpdateProdutos />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
