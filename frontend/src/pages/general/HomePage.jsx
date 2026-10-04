import React, { useState } from 'react'
import Header from '../../components/home/Header'
import { CATEGORIES } from '../../data/categories';
import {
    ArrowRight,
    CheckCircle,
    Headphones,
    MonitorSmartphone,
    Bolt,
    Timer,
    Heart,
    Star,
    ShoppingBag,
    Check,
    Watch,
    Coffee,
    Backpack,
    FlaskConical,
    Keyboard,
    CupSoda,
    TrendingUp,
    Truck,
    Lock,
    RotateCcw,
    Smartphone,
    Shirt,
    Sparkles,
    Home,
    Dumbbell,
    Package,
    Tag,
} from "lucide-react";
import CategoryCard from '../../components/home/CategoryCard';
import { useProducts } from '../../hook/useProduct';
import ProductCard from '../../components/home/ProductCard';
import { calculateDiscount, getDiscountedProducts } from '../../calculations';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate()
    const [isSubscribed, setIsSubscribed] = useState(false);

    const { data: products = [], isLoading, isError } = useProducts({ limit: 8 })

    const discountedProducts = useMemo(() => getDiscountedProducts(products), [products]);

    const featuredProduct = discountedProducts[0] || null;
    
    const getCategoryIcon = (category) => {
        switch (category?.toLowerCase()) {
            case "electronics":
                return MonitorSmartphone;
            case "audio":
                return Headphones;
            default:
                return Package;
        }
    };

    return (
        <main className="w-full max-w-7xl mx-auto mt-12 p-4 pt-36 bg-background min-h-screen flex flex-col gap-6">
            <section className="mb-6 bg-surface rounded-2xl border border-border overflow-hidden shadow-sm">
                <div className="grid grid-cols-1 min-[922px]:grid-cols-12 min-h-125">
                    {/* Left Side Content */}
                    <div className="min-[922px]:col-span-6 p-8 md:p-12 lg:p-14 flex flex-col justify-between z-10">
                        <div>
                            {/* Sale Badge */}
                            <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1 rounded-full bg-accent-light text-primary text-xs font-bold uppercase tracking-wider">
                                <span className="w-2 h-2 rounded-full bg-primary animate-ping [animation-duration:1s] shrink-0" />
                                Spring Marketplace Sale • Up to 40% Off
                            </div>

                            {/* Heading */}
                            <h1 className="max-w-xl font-display text-4xl sm:text-5xl font-extrabold text-text-primary tracking-tight leading-[1.15] mb-4">
                                Everything You Need, All in One Place
                            </h1>

                            {/* Description */}
                            <p className="font-body-lg text-base sm:text-lg text-text-secondary max-w-lg leading-relaxed mb-8">
                                Shop millions of verified products across electronics, fashion,
                                beauty, home essentials, and sports with express dispatch and
                                easy returns.
                            </p>

                            {/* CTAs */}
                            <div className="flex flex-wrap items-center gap-3.5 mb-8">
                                <a
                                    href="#todays-deals"
                                    className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg bg-primary hover:bg-secondary text-on-primary font-semibold text-sm transition-all shadow-md active:scale-95"
                                >
                                    Shop Now
                                    <ArrowRight size={18} strokeWidth={2.2} className="ml-2" />
                                </a>

                                <a
                                    href="#shop-categories"
                                    className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-surface hover:bg-surface-container-low text-text-primary font-semibold text-sm border border-border transition-all shadow-sm"
                                >
                                    Explore Categories
                                </a>
                            </div>
                        </div>

                        {/* Perks */}
                        <div className="pt-6 border-t border-border flex flex-wrap items-center gap-4 text-xs font-semibold text-text-secondary">
                            <span className="flex items-center gap-1.5 bg-surface-container-low px-3 py-1.5 rounded-full text-text-primary">
                                <CheckCircle size={16} strokeWidth={2.2} className="text-success" />
                                Express Delivery
                            </span>

                            <span className="flex items-center gap-1.5 bg-surface-container-low px-3 py-1.5 rounded-full text-text-primary">
                                <CheckCircle size={16} strokeWidth={2.2} className="text-success" />
                                30-Day Easy Returns
                            </span>

                            <span className="flex items-center gap-1.5 bg-surface-container-low px-3 py-1.5 rounded-full text-text-primary">
                                <CheckCircle size={16} strokeWidth={2.2} className="text-success" />
                                Buyer Protection
                            </span>
                        </div>
                    </div>

                    {/* Right Side Visual */}
                    <button 
                        onClick={()=>navigate(`/product-detail/${featuredProduct?._id}`)}
                        className="hidden min-[922px]:flex min-[922px]:col-span-6 relative min-h-90 lg:min-h-full bg-surface-container-low overflow-hidden cursor-pointer"
                    >
                        {featuredProduct && (
                            <>
                                <img
                                    alt={featuredProduct._id}
                                    className="w-full h-full object-cover object-center"
                                    src={featuredProduct.images[0]}
                                />

                                {/* Floating Badge 1 */}
                                <div className="absolute top-6 left-6 bg-surface/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-border shadow-md flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center text-primary flex-shrink-0">
                                        <Tag size={21} strokeWidth={2.2} />
                                    </div>

                                    <div>
                                        <span className="block text-[10px] uppercase font-bold text-primary tracking-wider">
                                            Limited Offer
                                        </span>

                                        <span className="block text-xs font-bold text-text-primary">
                                            {featuredProduct.discount}% OFF • {featuredProduct.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Floating Badge 2 */}
                                <div className="absolute bottom-6 right-6 bg-surface/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-border shadow-md flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center text-secondary flex-shrink-0">
                                        <Package size={21} strokeWidth={2.2} />
                                    </div>

                                    <div>
                                        <span className="block text-left text-xs font-bold text-text-primary">
                                            {featuredProduct.title}
                                        </span>

                                        <span className="block text-left text-[11px] text-text-secondary">
                                            {featuredProduct.stock > 5
                                                ? "In Stock • Ready to ship"
                                                : featuredProduct.stock > 0
                                                    ? `Only ${featuredProduct.stock} left`
                                                    : "Currently unavailable"}
                                        </span>
                                    </div>
                                </div>
                            </>
                        )}
                    </button>
                </div>
            </section>

            {/* Shop Categories */}
            <section className="mb-6" id="shop-categories">
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
                    <div>
                        <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-text-primary">
                            Shop by Category
                        </h2>

                        <p className="font-body-md text-sm text-text-secondary mt-1">
                            Browse through our most popular marketplace departments
                        </p>
                    </div>
                </div>

                {/* Categories */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
                    <CategoryCard
                        name="Electronics"
                        desc="Latest gadgets and smart devices."
                        items="8"
                        Icon={Smartphone}
                    />
                    <CategoryCard
                        name="Fashion"
                        desc="Trendy styles for every look."
                        items="5"
                        Icon={Shirt}
                    />
                    <CategoryCard
                        name="Beauty & Care"
                        desc="Beauty essentials for everyday care."
                        items="7"
                        Icon={Sparkles}
                    />
                    <CategoryCard
                        name="Home & Living"
                        desc="Everything to make your home better."
                        items="7"
                        Icon={Home}
                    />
                    <CategoryCard
                        name="Sports & Fitness"
                        desc="Gear for an active lifestyle."
                        items="10"
                        Icon={Dumbbell}
                    />
                </div>
            </section>

            {/* TODAY'S DEALS / FLASH SALE */}
            {discountedProducts && (
                <section className="mb-space-xl" id="todays-deals">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
                        <div className="flex flex-wrap items-end gap-3 sm:gap-6">
                            <div className="flex flex-col items-start gap-1.5">
                                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-on-primary text-[0.6rem] font-bold uppercase tracking-wider">
                                    <Bolt size={14} strokeWidth={2.5} />
                                    Flash Sale
                                </span>

                                <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-text-primary">
                                    Today's Deals
                                </h2>
                            </div>

                            <div className="flex items-center gap-1.5 bg-accent-light px-3 py-1 rounded-lg text-secondary text-xs font-bold font-mono">
                                <Timer size={14} className="text-primary" />
                                <span>Ending in: 08h : 42m : 15s</span>
                            </div>
                        </div>

                        {discountedProducts.length > 4 &&
                            (<a
                                href="#"
                                className="inline-flex items-center gap-1 font-label-md text-sm text-primary hover:text-secondary font-semibold transition-colors"
                            >
                                View All Deals
                                <ArrowRight size={16} />
                            </a>)
                        }
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {
                            discountedProducts.map(product => (
                                <ProductCard
                                    key={product._id}
                                    id={product._id}
                                    title={product.title}
                                    price={product.price}
                                    category={product.category}
                                    imgUrl={product.images[0]}
                                    off={calculateDiscount(product.comparePrice, product.price)}
                                    comparePrice={product.comparePrice}
                                />
                            ))
                        }
                    </div>
                </section>)}

            {/* FULL-WIDTH PROMOTIONAL BANNER */}
            <section className="mb-space-xl rounded-2xl bg-linear-to-r from-secondary via-primary to-primary-container p-8 md:p-12 text-on-primary shadow-md relative overflow-hidden">

                <div className="relative z-10 max-w-2xl">
                    <span className="inline-block px-3 py-1 rounded-full bg-accent-light/20 text-on-primary text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-sm">
                        Exclusive Marketplace Privilege
                    </span>

                    <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
                        Big Savings, Every Day
                    </h2>

                    <p className="text-accent-light text-base sm:text-lg mb-6 leading-relaxed">
                        Discover unbeatable deals across top electronics, everyday fashion,
                        beauty essentials, and home living.
                    </p>

                    <div className="flex flex-row items-center gap-4">

                        <a
                            href="#featured-products"
                            className="inline-flex items-center px-6 py-3 rounded-lg bg-surface text-secondary hover:bg-accent-light font-bold text-sm transition-all shadow-sm"
                        >
                            Shop Deals Now
                            <ArrowRight size={16} className="ml-1.5" />
                        </a>

                    </div>
                </div>

                {/* Decorative shapes */}
                <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-white/10 pointer-events-none blur-xl" />

                <div className="absolute -bottom-20 right-1/4 w-60 h-60 rounded-full bg-secondary/30 pointer-events-none blur-2xl" />

            </section>

            {/* FEATURED PRODUCTS */}
            <section className="mb-space-xl" id="featured-products">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
                    <div>
                        <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-text-primary">
                            Featured Products
                        </h2>

                        <p className="font-body-md text-sm text-text-secondary mt-1">
                            Handpicked quality essentials with verified seller guarantees
                        </p>
                    </div>

                    {/* Category Filter Tabs */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                        {CATEGORIES.map(
                            (category, index) => (
                                <button
                                    key={category.value}
                                    type="button"
                                    className={
                                        index === 0
                                            ? "px-3.5 py-1.5 rounded-full bg-primary text-on-primary text-xs font-bold shadow-sm whitespace-nowrap"
                                            : "px-3.5 py-1.5 rounded-full bg-surface hover:bg-surface-container-low text-text-secondary font-medium text-xs border border-border transition-colors whitespace-nowrap"
                                    }
                                >
                                    {category.label}
                                </button>
                            )
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {
                        products.map(product => (
                            <ProductCard
                                key={product._id}
                                id={product._id}
                                title={product.title}
                                price={product.price}
                                category={product.category}
                                imgUrl={product.images[0]}
                                off={calculateDiscount(product.comparePrice, product.price)}
                                comparePrice={product.comparePrice}
                            />
                        ))
                    }
                </div>
            </section>

            {/* BEST SELLERS */}
            <section className="mb-space-xl" id="best-sellers">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
                    <div>
                        <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-text-primary">
                            Best Sellers
                        </h2>

                        <p className="font-body-md text-sm text-text-secondary mt-1">
                            Highest velocity orders across the marketplace
                        </p>
                    </div>

                    <div className="flex items-center gap-2 bg-surface-container-low p-1 rounded-lg border border-border">
                        <button
                            type="button"
                            className="px-3 py-1 text-xs font-bold rounded-md bg-surface text-primary shadow-sm"
                        >
                            This Week
                        </button>

                        <button
                            type="button"
                            className="px-3 py-1 text-xs font-medium rounded-md text-text-secondary hover:text-text-primary transition-colors"
                        >
                            Top Rated
                        </button>

                        <button
                            type="button"
                            className="px-3 py-1 text-xs font-medium rounded-md text-text-secondary hover:text-text-primary transition-colors"
                        >
                            Trending
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">

                    {/* Rank #1 */}
                    <div className="bg-surface rounded-xl border border-border p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative">
                        <span className="absolute top-4 left-4 z-10 w-7 h-7 rounded-full bg-primary text-on-primary font-extrabold text-xs flex items-center justify-center shadow-md">
                            #1
                        </span>

                        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-surface-container-low mb-3">
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEqM3wE-qsssvi323I-pmC5ZRNMfZEdbGawmN2p_iaiimCmEIzWqN8HP1esoRdDcjGLUqQ1dzoKJ_p2ne1SVL8jM54sLETylIsE5cKMGrOqgn3paPTC9enZh7Tc_oB3vScPHiYZX-2N0sc1_MDo1g_8jQYf3Auas4Wbt8dPOnQ-qfB1XsW3Y-nvznkajKeBP4v9-pEv9Q6mBJ_9sexjOdASmN0S74N2EBvbI2eORacrW5WsV4GAEDt"
                                alt="Flagship Pro Smartphone"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div>
                            <span className="text-[11px] font-bold text-success flex items-center gap-1 mb-1">
                                <TrendingUp size={13} strokeWidth={2.5} />
                                Over 5k bought this month
                            </span>

                            <h4 className="font-bold text-sm text-text-primary">
                                Flagship Pro Smartphone 256GB
                            </h4>

                            <p className="text-xs text-text-secondary mt-0.5">
                                High-speed 5G, OLED 120Hz
                            </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                            <span className="font-bold text-base text-text-primary">
                                $799.00
                            </span>

                            <button
                                type="button"
                                className="px-3 py-1.5 rounded-lg bg-primary text-on-primary hover:bg-secondary text-xs font-semibold transition-colors"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>

                    {/* Rank #2 */}
                    <div className="bg-surface rounded-xl border border-border p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative">
                        <span className="absolute top-4 left-4 z-10 w-7 h-7 rounded-full bg-secondary text-on-primary font-extrabold text-xs flex items-center justify-center shadow-md">
                            #2
                        </span>

                        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-surface-container-low mb-3">
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDln-oDqYRryCqJrRr3kbuqvHSwB0xd26fGRHhsJiQVYeTsnpfGyJWJKt5Q0qNQGmfGje8FcSzjQnUEFWyN0PYlI1pC7ZqntdCNPhXtfCR3yqB2DGq4MLoZbHDZD_g1Al6p4vXeHLWaio1AnYba_zpn9ttZ8FhJoGzv-1BMRq1nYfJnWdwXpGIYLqvFnTDr7qpssCyFGZeq2BM2XJM_4GA-bANj5C_ovNToTWFWhcgynUQJWjZA8lFn"
                                alt="Studio ANC Wireless Headphones"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div>
                            <span className="text-[11px] font-bold text-success flex items-center gap-1 mb-1">
                                <TrendingUp size={13} strokeWidth={2.5} />
                                Over 3.8k bought this month
                            </span>

                            <h4 className="font-bold text-sm text-text-primary">
                                Studio ANC Wireless Headphones
                            </h4>

                            <p className="text-xs text-text-secondary mt-0.5">
                                40h battery, Spatial Sound
                            </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                            <span className="font-bold text-base text-text-primary">
                                $149.00
                            </span>

                            <button
                                type="button"
                                className="px-3 py-1.5 rounded-lg bg-primary text-on-primary hover:bg-secondary text-xs font-semibold transition-colors"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>

                    {/* Rank #3 */}
                    <div className="bg-surface rounded-xl border border-border p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative">
                        <span className="absolute top-4 left-4 z-10 w-7 h-7 rounded-full bg-secondary text-on-primary font-extrabold text-xs flex items-center justify-center shadow-md">
                            #3
                        </span>

                        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-surface-container-low mb-3">
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGV68qZwXVDA4t9oKgJ5Uxpjp9KMSMkW66_DLDKfiuexS2RnOSOu778tFiDO0_un5BJL8Us0zwOpjIORvy-yjZaHTLgiWFOl9Ho5LVW54P2kmEIWly25YYpZjQCGaWmcUT1j9PuRdX7kbA2cj1unm-UlyKOte-tx7Syp1_RRgMK2Zb9qlWWeKboTZl9OdMnVehTPuA1amvIDHC9migU4SlG_gMbdl9FrPkVYsm7aW1cneyL5Qc4iaB"
                                alt="Aerofit Runner V2 Sneakers"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div>
                            <span className="text-[11px] font-bold text-success flex items-center gap-1 mb-1">
                                <TrendingUp size={13} strokeWidth={2.5} />
                                Over 3.2k bought this month
                            </span>

                            <h4 className="font-bold text-sm text-text-primary">
                                Aerofit Runner V2 Sneakers
                            </h4>

                            <p className="text-xs text-text-secondary mt-0.5">
                                Ultra-cushion responsive foam
                            </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                            <span className="font-bold text-base text-text-primary">
                                $89.00
                            </span>

                            <button
                                type="button"
                                className="px-3 py-1.5 rounded-lg bg-primary text-on-primary hover:bg-secondary text-xs font-semibold transition-colors"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>

                    {/* Rank #4 */}
                    <div className="bg-surface rounded-xl border border-border p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative">
                        <span className="absolute top-4 left-4 z-10 w-7 h-7 rounded-full bg-text-secondary text-on-primary font-extrabold text-xs flex items-center justify-center shadow-md">
                            #4
                        </span>

                        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-accent-light/40 flex items-center justify-center mb-3">
                            <Watch
                                size={52}
                                strokeWidth={1.8}
                                className="text-primary"
                            />
                        </div>

                        <div>
                            <span className="text-[11px] font-bold text-success flex items-center gap-1 mb-1">
                                <TrendingUp size={13} strokeWidth={2.5} />
                                Over 2.6k bought this month
                            </span>

                            <h4 className="font-bold text-sm text-text-primary">
                                Smart Ultra Watch Series X
                            </h4>

                            <p className="text-xs text-text-secondary mt-0.5">
                                ECG, GPS, Waterproof 50m
                            </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                            <span className="font-bold text-base text-text-primary">
                                $249.00
                            </span>

                            <button
                                type="button"
                                className="px-3 py-1.5 rounded-lg bg-primary text-on-primary hover:bg-secondary text-xs font-semibold transition-colors"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>

                </div>
            </section>

            {/* TRUST & SERVICE FEATURES */}
            <section className="mb-space-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                    {/* Free Express Shipping */}
                    <div className="p-6 bg-surface rounded-xl border border-border shadow-sm flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-accent-light text-primary flex items-center justify-center flex-shrink-0">
                            <Truck size={24} strokeWidth={2.2} />
                        </div>

                        <div>
                            <h4 className="font-bold text-sm text-text-primary">
                                Free Express Shipping
                            </h4>

                            <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                                Fast, tracked dispatch on all orders over $50 nationwide.
                            </p>
                        </div>
                    </div>

                    {/* Secure Payments */}
                    <div className="p-6 bg-surface rounded-xl border border-border shadow-sm flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-accent-light text-primary flex items-center justify-center flex-shrink-0">
                            <Lock size={24} strokeWidth={2.2} />
                        </div>

                        <div>
                            <h4 className="font-bold text-sm text-text-primary">
                                Secure Payments
                            </h4>

                            <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                                256-bit encrypted checkout with Stripe &amp; Apple Pay support.
                            </p>
                        </div>
                    </div>

                    {/* 30-Day Easy Returns */}
                    <div className="p-6 bg-surface rounded-xl border border-border shadow-sm flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-accent-light text-primary flex items-center justify-center flex-shrink-0">
                            <RotateCcw size={24} strokeWidth={2.2} />
                        </div>

                        <div>
                            <h4 className="font-bold text-sm text-text-primary">
                                30-Day Easy Returns
                            </h4>

                            <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                                Hassle-free refunds and quick exchanges at no extra charge.
                            </p>
                        </div>
                    </div>

                    {/* 24/7 Dedicated Support */}
                    <div className="p-6 bg-surface rounded-xl border border-border shadow-sm flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-accent-light text-primary flex items-center justify-center flex-shrink-0">
                            <Headphones size={24} strokeWidth={2.2} />
                        </div>

                        <div>
                            <h4 className="font-bold text-sm text-text-primary">
                                24/7 Dedicated Support
                            </h4>

                            <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                                Live customer chat and instant order resolution anytime.
                            </p>
                        </div>
                    </div>

                </div>
            </section>

            {/* NEWSLETTER */}
            <section className="relative bg-accent-light rounded-2xl p-8 md:p-14 overflow-hidden mb-space-xl border border-border/80 text-center shadow-sm">
                <div className="max-w-xl mx-auto relative z-10">
                    <span className="inline-block px-3 py-1 rounded-full bg-surface text-primary text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
                        Exclusive Deals &amp; Drops
                    </span>

                    <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-text-primary mb-3 tracking-tight">
                        Stay Updated with Cartora
                    </h2>

                    <p className="text-sm text-text-secondary mb-6 leading-relaxed">
                        Get the latest flash sales, new arrivals, and member-only discounts
                        straight to your inbox.
                    </p>

                    {!isSubscribed ? (
                        <form
                            className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
                            onSubmit={(e) => {
                                e.preventDefault();
                                setIsSubscribed(true);
                            }}
                        >
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                required
                                className="flex-1 bg-surface border border-border px-4 py-3 rounded-lg text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                            />

                            <button
                                type="submit"
                                className="bg-primary hover:bg-secondary text-on-primary font-semibold text-sm px-6 py-3 rounded-lg transition-all shadow-md active:scale-95 flex-shrink-0"
                            >
                                Subscribe
                            </button>
                        </form>
                    ) : (
                        <div className="p-3 bg-surface text-success rounded-lg text-sm font-semibold shadow-sm flex items-center justify-center gap-2 max-w-md mx-auto">
                            <CheckCircle size={17} strokeWidth={2.2} />
                            Thank you for subscribing! Check your inbox for your welcome voucher.
                        </div>
                    )}

                    <p className="text-xs text-text-secondary mt-3">
                        No spam. Unsubscribe anytime with a single click.
                    </p>
                </div>

                {/* Decorative blur glow */}
                <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-primary/10 blur-xl pointer-events-none" />

                <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-secondary/15 blur-xl pointer-events-none" />
            </section>
        </main>
    )
}

export default HomePage
