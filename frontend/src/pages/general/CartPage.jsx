import React, { useState } from "react";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import api from "../../api/api";
import { useQuery } from "@tanstack/react-query";
import Loader from '../../components/helpers/Loader'
import { addToCart, removeFromCart } from "../../api/cartApi";
import { toast } from "sonner";

function CartPage() {
    const getCarts = async () => {
        const { data } = await api.get("/cart/get-carts")
        return data.data.items
    }

    const {
        data: cartItems = [],
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["carts"],
        queryFn: getCarts,
    });

    const updateQuantity = async (item, type) => {
        // 1 se neeche nahi jana
        if (type === "decrease" && item.quantity === 1) {
            return;
        }

        // stock se zyada nahi jana
        if (
            type === "increase" &&
            item.quantity >= item.product.stock
        ) {
            toast.error("No more stock available");
            return;
        }

        try {
            const quantity = type === "increase" ? 1 : -1;

            await addToCart(item.product._id, quantity);

            await refetch();
        } catch (error) {
            console.log(error);

            toast.error(
                error?.response?.data?.message ||
                "Failed to update cart"
            );
        }
    };

    const removeItem = async (id) => {
        try {
            await removeFromCart(id);

            toast.success("Product removed from cart");

            await refetch();
        } catch (error) {
            console.log(error);

            toast.error(
                error?.response?.data?.message ||
                "Failed to remove product"
            );
        }
    };

    const subtotal = cartItems?.reduce(
        (total, item) => total + item?.product.price * item?.quantity,
        0
    );

    const shipping = subtotal > 0 ? 200 : 0;
    const total = subtotal + shipping;


    if (isLoading) {
        return (
            <div className="min-h-125 flex flex-col items-center justify-center mt-20">
                <Loader />
            </div>
        );
    }
    if (cartItems.length === 0) {
        return (
            <div className="min-h-125 flex flex-col items-center justify-center mt-20">
                <ShoppingBag className="w-14 h-14 text-text-secondary mb-4" />

                <h2 className="text-xl font-semibold text-text-primary">
                    Your cart is empty
                </h2>

                <p className="text-sm text-text-secondary mt-1">
                    Add some products to your cart.
                </p>
            </div>
        );
    }


    return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 mt-34">
            {/* Header */}
            <div className="mb-8">
                <p className="text-sm text-text-secondary mb-2">
                    Home / Cart
                </p>

                <h1 className="text-3xl font-bold text-text-primary">
                    Your Shopping Cart
                </h1>

                <p className="text-sm text-text-secondary mt-1">
                    {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                {/* Cart Items */}
                <div className="lg:col-span-2 bg-surface rounded-xl border border-border overflow-hidden">
                    {cartItems.map((item) => (
                        <div
                            key={item?.product._id}
                            className="p-5 border-b border-border last:border-b-0"
                        >
                            <div className="flex flex-col sm:flex-row gap-4">
                                {/* Image */}
                                <div className="w-28 h-28 rounded-lg overflow-hidden bg-surface-container-low shrink-0">
                                    <img
                                        src={item?.product.images?.[0]}
                                        alt={item?.product.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Product Info */}
                                <div className="flex-1">
                                    <h3 className="font-semibold text-text-primary">
                                        {item?.product.title}
                                    </h3>

                                    <p className="text-sm text-text-secondary mt-1">
                                        Rs. {item?.product.price}
                                    </p>

                                    <div className="flex items-center justify-between mt-5">
                                        {/* Quantity */}
                                        <div className="flex items-center bg-surface-container-low rounded-lg p-1">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    updateQuantity(item, "decrease")
                                                }
                                                className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-surface"
                                            >
                                                <Minus size={15} />
                                            </button>

                                            <span className="w-9 text-center text-sm font-semibold">
                                                {item?.quantity}
                                            </span>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    updateQuantity(item, "increase")
                                                }
                                                className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-surface"
                                            >
                                                <Plus size={15} />
                                            </button>
                                        </div>

                                        {/* Remove */}
                                        <button
                                            type="button"
                                            onClick={() => removeItem(item?.product._id)}
                                            className="flex items-center gap-1.5 text-sm text-error hover:opacity-80"
                                        >
                                            <Trash2 size={16} />
                                            Remove
                                        </button>
                                    </div>
                                </div>

                                {/* Item Total */}
                                <div className="sm:text-right">
                                    <p className="font-semibold text-text-primary">
                                        Rs. {item?.product.price * item?.quantity}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="bg-surface rounded-xl border border-border p-6 lg:sticky lg:top-24">
                    <h2 className="text-xl font-semibold text-text-primary mb-6">
                        Order Summary
                    </h2>

                    <div className="space-y-4 text-sm">
                        <div className="flex justify-between">
                            <span className="text-text-secondary">
                                Subtotal
                            </span>

                            <span className="font-medium text-text-primary">
                                Rs. {subtotal}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-text-secondary">
                                Shipping
                            </span>

                            <span className="font-medium text-text-primary">
                                Rs. {shipping}
                            </span>
                        </div>

                        <div className="border-t border-border pt-4 flex justify-between">
                            <span className="font-semibold text-text-primary">
                                Total
                            </span>

                            <span className="text-xl font-bold text-primary">
                                Rs. {total}
                            </span>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="w-full mt-6 h-12 rounded-lg bg-primary text-white font-semibold hover:bg-secondary transition-colors"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartPage;