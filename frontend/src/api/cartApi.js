import api from "./api";

const addToCart = async (productId, quantity) => {
    const {data} = await api.post("/cart/add-to-cart", { productId, quantity })
    return data;
}

const removeFromCart = async (productId) => {
    const { data } = await api.delete(
        `/cart/remove-from-cart/${productId}`
    );

    return data.data;
};
export {addToCart, removeFromCart}