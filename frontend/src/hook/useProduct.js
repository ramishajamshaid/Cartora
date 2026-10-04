import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../api/productsApi"
export const useProducts = ({category, limit}={})=>{
    return useQuery({
        queryKey: ["products", {category, limit}],
        queryFn: ()=>getProducts({category, limit})
    })
}