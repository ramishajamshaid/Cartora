import { Check, Heart, ShoppingBag, ShoppingCart } from "lucide-react";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AuthContext } from "../../context/auth/AuthContext";
import { addToCart } from "../../api/cartApi";
import { useQueryClient } from "@tanstack/react-query";

function ProductCard({
    imgUrl,
    id,
    title,
    category,
    price,
    off,
    comparePrice,
}) {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const [addedState, setAddedState] = useState(false)
    const queryClient = useQueryClient();

    const handleAddToCart = async () => {
        if (!user) {
            toast.error("Please Login first.")
            return;
        }
        try {
            await addToCart(id, 1);
            setAddedState(true)
            setTimeout(() => {
                setAddedState(false)
            }, 3000)
            toast.success("Product added to cart.")
            await queryClient.invalidateQueries({
                queryKey: ["carts"]
            })
        } catch (error) {
            console.log(error);
            toast.error("Failed to add your product")
        }
    }

    return (
        <div
            onClick={() => navigate(`/product-detail/${id}`)}
            className="group bg-surface rounded-xl border border-border p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
        >
            <div className="flex flex-col items-start">

                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-surface-container-low mb-3">

                    <img
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        src={imgUrl}
                    />

                    {off ? (
                        <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-primary text-on-primary text-[11px] font-bold uppercase tracking-wider">
                            -{off}% OFF
                        </span>
                    ) : null}

                    {/* Wishlist */}
                    <button
                        aria-label="Save to wishlist"
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();

                            // wishlist function
                        }}
                        className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-surface/90 backdrop-blur-sm text-text-secondary hover:text-primary flex items-center justify-center shadow-sm"
                    >
                        <Heart size={16} />
                    </button>
                </div>

                <span className="text-[11px] uppercase font-bold text-text-secondary tracking-wider">
                    {category}
                </span>

                <h4 className="font-bold line-clamp-2 text-left text-sm text-text-primary mt-1 group-hover:text-primary transition-colors">
                    {title}
                </h4>
            </div>

            <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">

                <div className="flex flex-col justify-center items-start gap-1">

                    {comparePrice && (
                        <span className="text-xs text-text-secondary line-through ml-1.5">
                            Rs. {comparePrice}
                        </span>
                    )}

                    <span className="text-[1rem] sm:text-[1.1rem] font-bold text-text-primary">
                        Rs. {price}
                    </span>
                </div>

                {/* Add to Cart */}
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart()
                    }}
                    className="hidden md:flex px-3 py-1.5 rounded-lg bg-surface hover:bg-accent-light text-secondary border border-border font-semibold text-xs transition-colors"
                    >
                    {
                        addedState? "Added to cart": "+ Add to Cart"
                    }
                </button>
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart()
                    }}
                    className="relative flex md:hidden px-3 py-1.5 rounded-lg bg-surface hover:bg-accent-light text-secondary border border-border font-semibold text-xs transition-colors"
                >
                    {
                        addedState ? (<span className="text-success transition-colors w-6 h-6"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 5L19 12H7.37671M20 16H8L6 3H3M11 6L13 8L17 4M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg></span>):
                        <ShoppingCart size={20} />
                    }
                </button>
            </div>
        </div>
    );
}

export default ProductCard;