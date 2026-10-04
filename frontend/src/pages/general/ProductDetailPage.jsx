import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Heart,
    Minus,
    Plus,
    ShoppingBag,
    Truck,
    RotateCcw,
    ShieldCheck,
    CreditCard,
    WalletCards,
    Banknote,
    PackageCheck,
    X,
    LockKeyhole,
    LogIn,
} from "lucide-react";
import api from "../../api/api";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/helpers/Loader";
import { toast } from "sonner";
import { AuthContext } from "../../context/auth/AuthContext";
import { addToCart } from "../../api/cartApi";

function ProductDetailPage() {
    const { id } = useParams();
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    const [showLoginModal, setShowLoginModal] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);

    const getProductDetail = async () => {
        const { data } = await api.get(
            `/product/get-product-detail-customer/${id}`
        );
        return data.data;
    };

    const handleAddToCart = async () => {
        if (!user) {
            setShowLoginModal(true)
            return;
        }
        try {
            await addToCart(id, quantity);
            toast.success("Product added to cart.")
        } catch (error) {
            console.log(error);
            toast.error("Failed to add your product")
        }
    }

    const {
        data: product,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["product-detail", id],
        queryFn: getProductDetail,
    });

    if (isLoading) {
        return (
            <div className="min-h-125 flex items-center justify-center mt-32">
                <Loader />
            </div>
        );
    }

    if (isError || !product) {
        return (
            <div className="min-h-125 flex items-center justify-center mt-32">
                <p className="text-text-secondary">
                    Unable to load product details.
                </p>
            </div>
        );
    }

    const images = product.images || [];

    const increaseQty = () => {
        if (quantity < product.stock) {
            setQuantity((prev) => prev + 1);
        }
    };

    const decreaseQty = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-8 mt-34">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-text-secondary mb-7">
                <span>Home</span>
                <span>/</span>
                <span className="flex-nowrap shrink-0">
                    {product.category?.name ||
                        product.category ||
                        "Products"}
                </span>
                <span>/</span>
                <span className="text-text-primary font-medium truncate max-w-60">
                    {product.title}
                </span>
            </div>

            {/* Main Product */}
            <div className="grid grid-cols-1 min-[922px]:grid-cols-2 gap-10">

                {/* ================= LEFT ================= */}
                <div>

                    {/* Main Image */}
                    <div className="relative sm:h-125 rounded-2xl bg-surface-container-low border border-border overflow-hidden">

                        {images.length > 0 ? (
                            <img
                                src={images[selectedImage]}
                                alt={product.title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-text-secondary">
                                No Image Available
                            </div>
                        )}

                        {/* Wishlist */}
                        <button
                            onClick={() =>
                                setIsFavorite((prev) => !prev)
                            }
                            className={`absolute top-4 right-4 w-11 h-11 rounded-full flex items-center hover:text-primary justify-center shadow-sm border transition cursor-pointer ${isFavorite
                                ? "bg-accent-light text-primary border-accent-light"
                                : "bg-white text-text-primary border-border hover:bg-surface"
                                }`}
                        >
                            <Heart
                                size={20}
                                fill={
                                    isFavorite
                                        ? "currentColor"
                                        : "none"
                                }
                            />
                        </button>
                    </div>

                    {/* Thumbnails */}
                    {images.length > 0 && (
                        <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
                            {images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() =>
                                        setSelectedImage(index)
                                    }
                                    className={`shrink-0 w-17 h-17 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition ${selectedImage === index
                                        ? "border-primary"
                                        : "border-border hover:border-primary/40"
                                        }`}
                                >
                                    <img
                                        src={image}
                                        alt={`${product.title} ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Service Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">

                        <div className="border border-border rounded-xl p-4 bg-surface">
                            <Truck
                                size={20}
                                className="text-primary mb-2"
                            />
                            <p className="text-sm font-semibold text-text-primary">
                                Fast Delivery
                            </p>
                            <p className="text-xs text-text-secondary mt-1">
                                Quick & reliable shipping
                            </p>
                        </div>

                        <div className="border border-border rounded-xl p-4 bg-surface">
                            <RotateCcw
                                size={20}
                                className="text-primary mb-2"
                            />
                            <p className="text-sm font-semibold text-text-primary">
                                Easy Returns
                            </p>
                            <p className="text-xs text-text-secondary mt-1">
                                Hassle-free returns
                            </p>
                        </div>

                        <div className="border border-border rounded-xl p-4 bg-surface">
                            <ShieldCheck
                                size={20}
                                className="text-primary mb-2"
                            />
                            <p className="text-sm font-semibold text-text-primary">
                                Secure Purchase
                            </p>
                            <p className="text-xs text-text-secondary mt-1">
                                Safe & protected
                            </p>
                        </div>

                    </div>
                </div>

                {/* ================= RIGHT ================= */}
                <div className="bg-surface border border-border rounded-2xl p-6 md:p-7">

                    {/* Category */}
                    <div className="flex items-center justify-between mb-4">
                        <span className="inline-flex px-3 py-1 rounded-full bg-accent-light text-primary text-xs font-semibold uppercase tracking-wide">
                            {product.category?.name ||
                                product.category ||
                                "Product"}
                        </span>

                        {product.condition && (
                            <span className="text-xs text-text-secondary capitalize">
                                {product.condition}
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-3xl lg:text-4xl font-title font-bold text-text-primary leading-tight">
                        {product.title}
                    </h1>

                    {/* Brand */}
                    {product.brand && (
                        <p className="mt-3 text-sm text-text-secondary">
                            Brand:{" "}
                            <span className="font-semibold text-text-primary">
                                {product.brand}
                            </span>
                        </p>
                    )}

                    {/* Divider */}
                    <div className="border-t border-border my-5" />

                    {/* Price */}
                    <div className="bg-surface-container-low rounded-xl p-4 mb-6">

                        <div className="flex items-end gap-3">
                            <span className="text-3xl font-bold text-text-primary">
                                ${product.price}
                            </span>

                            {product.comparePrice && (
                                <span className="text-base text-text-secondary line-through mb-1">
                                    ${product.comparePrice}
                                </span>
                            )}

                            {product.comparePrice &&
                                product.comparePrice >
                                product.price && (
                                    <span className="text-xs font-semibold text-success mb-2">
                                        Save $
                                        {(
                                            product.comparePrice -
                                            product.price
                                        ).toFixed(2)}
                                    </span>
                                )}
                        </div>

                        <p className="text-xs text-text-secondary mt-1">
                            Price includes applicable taxes
                        </p>
                    </div>

                    {/* Stock */}
                    <div className="mb-6">

                        {product.stock > 0 ? (
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-success" />
                                <p className="text-sm font-semibold text-success">
                                    In Stock
                                </p>

                                <span className="text-xs text-text-secondary">
                                    ({product.stock} available)
                                </span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-error" />
                                <p className="text-sm font-semibold text-error">
                                    Out of Stock
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Quantity */}
                    {product.stock > 0 && (
                        <div className="flex items-center justify-between mb-6">

                            <div>
                                <p className="text-sm font-semibold text-text-primary">
                                    Quantity
                                </p>
                                <p className="text-xs text-text-secondary mt-1">
                                    Select how many you want
                                </p>
                            </div>

                            <div className="flex items-center border border-border rounded-lg overflow-hidden">

                                <button
                                    onClick={decreaseQty}
                                    disabled={quantity <= 1}
                                    className="w-10 h-10 flex items-center justify-center hover:bg-surface-container-low disabled:opacity-40"
                                >
                                    <Minus size={16} />
                                </button>

                                <span className="w-12 h-10 flex items-center justify-center border-x border-border text-sm font-semibold">
                                    {quantity}
                                </span>

                                <button
                                    onClick={increaseQty}
                                    disabled={
                                        quantity >= product.stock
                                    }
                                    className="w-10 h-10 flex items-center justify-center hover:bg-surface-container-low disabled:opacity-40"
                                >
                                    <Plus size={16} />
                                </button>

                            </div>
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex gap-3">

                        <button
                            disabled={!product.stock}
                            onClick={() => handleAddToCart()}
                            className="flex-1 h-12 rounded-xl bg-primary text-white font-semibold flex items-center justify-center gap-2 hover:bg-secondary cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ShoppingBag size={19} />
                            Add to Cart
                        </button>

                        <button
                            onClick={() =>
                                setIsFavorite((prev) => !prev)
                            }
                            className={`w-12 h-12 shrink-0 rounded-xl border flex items-center justify-center transition ${isFavorite
                                ? "bg-accent-light text-primary border-accent-light"
                                : "bg-surface text-text-primary border-border hover:bg-surface-container-low"
                                }`}
                        >
                            <Heart
                                size={20}
                                fill={
                                    isFavorite
                                        ? "currentColor"
                                        : "none"
                                }
                            />
                        </button>

                    </div>

                    {/* Payment Methods */}
                    <div className="mt-7 pt-6 border-t border-border">

                        <div className="flex items-center gap-2 mb-4">
                            <CreditCard
                                size={18}
                                className="text-primary"
                            />
                            <h3 className="text-sm font-semibold text-text-primary">
                                Secure Payment Options
                            </h3>
                        </div>

                        <div className="grid grid-cols-3 gap-3">

                            <div className="h-14 border border-border rounded-lg flex flex-col items-center justify-center bg-surface-container-low">
                                <CreditCard
                                    size={19}
                                    className="text-text-primary"
                                />
                                <span className="text-[10px] text-center text-text-secondary mt-1">
                                    Card
                                </span>
                            </div>

                            <div className="h-14 border border-border rounded-lg flex flex-col items-center justify-center bg-surface-container-low">
                                <WalletCards
                                    size={19}
                                    className="text-text-primary"
                                />
                                <span className="text-[10px] text-center text-text-secondary mt-1">
                                    Wallet
                                </span>
                            </div>

                            <div className="h-14 border border-border rounded-lg flex flex-col items-center justify-center bg-surface-container-low">
                                <Banknote
                                    size={19}
                                    className="text-text-primary"
                                />
                                <span className="text-[10px] text-center text-text-secondary mt-1">
                                    Cash on Delivery
                                </span>
                            </div>

                        </div>

                        <p className="text-xs text-text-secondary mt-3 flex items-center gap-1">
                            <ShieldCheck size={14} />
                            Your payment information is securely protected.
                        </p>

                    </div>
                </div>
            </div>

            {/* ================= PRODUCT DETAILS ================= */}
            <div className="mt-10 bg-surface border border-border rounded-2xl overflow-hidden">

                <div className="px-6 py-5 border-b border-border">
                    <h2 className="text-xl font-semibold text-text-primary">
                        Product Details
                    </h2>

                    <p className="text-sm text-text-secondary mt-1">
                        Everything you need to know about this product.
                    </p>
                </div>

                <div className="p-6">

                    {/* Description */}
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-text-primary mb-2">
                            Product Description
                        </h3>

                        <p className="text-sm text-text-secondary leading-6">
                            {product.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                        <div className="rounded-xl bg-surface-container-low p-4">
                            <p className="text-xs text-text-secondary">
                                Category
                            </p>
                            <p className="text-sm font-semibold text-text-primary mt-1">
                                {product.category?.name ||
                                    product.category ||
                                    "-"}
                            </p>
                        </div>

                        <div className="rounded-xl bg-surface-container-low p-4">
                            <p className="text-xs text-text-secondary">
                                Brand
                            </p>
                            <p className="text-sm font-semibold text-text-primary mt-1">
                                {product.brand || "-"}
                            </p>
                        </div>

                        <div className="rounded-xl bg-surface-container-low p-4">
                            <p className="text-xs text-text-secondary">
                                Condition
                            </p>
                            <p className="text-sm font-semibold text-text-primary mt-1 capitalize">
                                {product.condition || "-"}
                            </p>
                        </div>

                        <div className="rounded-xl bg-surface-container-low p-4">
                            <p className="text-xs text-text-secondary">
                                SKU
                            </p>
                            <p className="text-sm font-semibold text-text-primary mt-1">
                                {product.sku || "-"}
                            </p>
                        </div>

                        <div className="rounded-xl bg-surface-container-low p-4">
                            <p className="text-xs text-text-secondary">
                                Availability
                            </p>
                            <p className="text-sm font-semibold text-text-primary mt-1 capitalize">
                                {product.status || "-"}
                            </p>
                        </div>

                        <div className="rounded-xl bg-surface-container-low p-4">
                            <p className="text-xs text-text-secondary">
                                Stock
                            </p>
                            <p className="text-sm font-semibold text-text-primary mt-1">
                                {product.stock || 0} units
                            </p>
                        </div>

                    </div>

                    {/* Bottom Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">

                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center shrink-0">
                                <PackageCheck
                                    size={19}
                                    className="text-primary"
                                />
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-text-primary">
                                    Quality Checked
                                </p>
                                <p className="text-xs text-text-secondary mt-1">
                                    Product information is verified.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center shrink-0">
                                <Truck
                                    size={19}
                                    className="text-primary"
                                />
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-text-primary">
                                    Reliable Delivery
                                </p>
                                <p className="text-xs text-text-secondary mt-1">
                                    Delivered safely to your doorstep.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center shrink-0">
                                <ShieldCheck
                                    size={19}
                                    className="text-primary"
                                />
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-text-primary">
                                    Secure Checkout
                                </p>
                                <p className="text-xs text-text-secondary mt-1">
                                    Safe and protected transactions.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {showLoginModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={() => setShowLoginModal(false)}
                    />

                    {/* Modal */}
                    <div className="relative w-full max-w-md bg-surface rounded-2xl shadow-xl p-6">

                        {/* Close */}
                        <button
                            onClick={() => setShowLoginModal(false)}
                            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-text-secondary hover:bg-surface-container-low hover:text-text-primary transition"
                        >
                            <X size={18} />
                        </button>

                        {/* Icon */}
                        <div className="w-14 h-14 rounded-full bg-accent-light text-primary flex items-center justify-center mx-auto mb-4">
                            <LockKeyhole size={25} />
                        </div>

                        {/* Content */}
                        <div className="text-center">
                            <h2 className="text-xl font-semibold text-text-primary">
                                Login Required
                            </h2>

                            <p className="text-sm text-text-secondary mt-2 leading-6">
                                Please log in to your account before adding products
                                to your cart.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 mt-6">

                            <button
                                onClick={() => setShowLoginModal(false)}
                                className="flex-1 h-11 rounded-lg border border-border text-text-primary text-sm font-medium hover:bg-surface-container-low transition"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() => navigate("/login")}
                                className="flex-1 h-11 rounded-lg bg-primary text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-secondary transition"
                            >
                                <LogIn size={17} />
                                Login
                            </button>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductDetailPage;