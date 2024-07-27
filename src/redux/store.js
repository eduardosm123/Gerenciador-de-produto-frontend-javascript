import { configureStore, createSlice } from "@reduxjs/toolkit";
import { categoriaSlice } from "./reducers/categoriaSlice";
import { produtoSlice } from "./reducers/produtoSlice";



export const store = configureStore({
    reducer: {
        categoria: categoriaSlice.reducer,
        produto: produtoSlice.reducer
    }
})

