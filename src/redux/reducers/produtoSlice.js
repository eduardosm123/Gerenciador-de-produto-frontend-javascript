import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    produtosList: {
        lista: [],
        pages: 1,
        totalPages: 1
    },
    produtoForm: {
        create: {
            name: '',
            price: '',
            description: '',
            category: {
                name: ''
            }
        },
        updateAndRead: {
            _id: '',
            name: '',
            price: '',
            description: '',
            category: {
                name: '',
                _id: '',
                createdAt: '',
                updatedAt: '',
            },
            createdAt: '',
            updatedAt: '',
            __v: ''
        }
    }
}


export const produtoSlice = createSlice({
    name: 'produto',
    initialState,
    reducers: {
        definirListaProdutos: (state, { payload }) => {
            state.produtosList.lista = payload
        },
        definirTotalPageProdutos: (state, { payload }) => {
            state.produtosList.totalPages = payload
        },
        definirPageProdutos: (state, { payload }) => {
            state.produtosList.pages = payload
        },
        definirProdutoFormCreate: (state, { payload }) => {
            const { campo, valor } = payload;
            state.produtoForm.create[campo] = valor;
        },
        limparFormularioCreateProduto: (state) => {
            state.produtoForm.create = initialState.produtoForm.create
        },
        definirCategoriaCreateProduto: (state, { payload }) => {
            state.produtoForm.create.category.name = payload;
        },
        definirProdutoFormUpdateAndReadInicial: (state, { payload }) => {
            state.produtoForm.updateAndRead = payload;
        },
        definirProdutoFormUpdateAndRead: (state, { payload }) => {
            const { campo, valor } = payload;
            state.produtoForm.updateAndRead[campo] = valor;
        },
        definirCategoriaDoProdutorFormUpdateAndRead: (state, { payload }) => {
            state.produtoForm.updateAndRead.category.name = payload
        },
        limparFormularioDeProdutoUpdateAndRead: (state, { payload }) => {
            state.produtoForm.updateAndRead = initialState.produtoForm.updateAndRead
        }
    }
})

export const { definirListaProdutos,
    definirTotalPageProdutos,
    definirPageProdutos,
    definirProdutoFormCreate,
    limparFormularioCreateProduto,
    definirCategoriaCreateProduto,
    definirProdutoFormUpdateAndReadInicial,
    definirProdutoFormUpdateAndRead,
    definirCategoriaDoProdutorFormUpdateAndRead,
    limparFormularioDeProdutoUpdateAndRead } = produtoSlice.actions