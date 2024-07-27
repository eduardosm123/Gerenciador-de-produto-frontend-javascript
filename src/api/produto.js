import axios from "axios";

const apiURL = import.meta.env.VITE_API_URL

export const postProduto = (novoProduto) => {
    try {
        axios.post(`${apiURL}/product`, novoProduto)
        return novoProduto;
    } catch (error) {
        console.log(error);
        return error;
    }
}


export const getProdutoPaginado = async (page) => {
    try {
        const resposta = await axios.get(`${apiURL}/product/${page}&10`)
        return resposta;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const getProdutoById = async (id) => {
    try {
        const resposta = await axios.get(`${apiURL}/product/${id}`)
        return resposta;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const updateProduto = async (id, data) => {
    try {
        await axios.put(`${apiURL}/product/${id}`, data);
    } catch (error) {
        console.log(error)
    }
}

export const deleteProduto = async (id) => {
    try {
        await axios.delete(`${apiURL}/product/${id}`);
    } catch (error) {
        console.log(error)
    }
}