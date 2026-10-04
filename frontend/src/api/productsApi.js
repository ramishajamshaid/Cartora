import api from "./api"

export const getProducts = async({category, limit}={})=>{
    const {data} = await api.get("/product/get-products", {
        params:{
            category,
            limit
        }
    })

    return data.data
}