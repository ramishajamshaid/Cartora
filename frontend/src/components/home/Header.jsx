import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Flame, Globe, Headset, Heart, LogOut, Menu, Search, ShoppingBag, ShoppingCart, Smartphone, Truck, User } from 'lucide-react'
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth/AuthContext';
import UserMenu from './UserMenu';
import api from '../../api/api';
import { toast } from 'sonner';
import { CATEGORIES } from '../../data/categories';
import { useQuery } from '@tanstack/react-query';

const Header = () => {
    const navigate = useNavigate()
    const { user, setUser, isLoading } = useContext(AuthContext)
    const [userModal, setUserModal] = useState(false)
    const [isLoadingLogout, setIsLoadingLogout] = useState(false)

    const handleLogout = async () => {
        setIsLoadingLogout(true)
        try {
            const res = await api.post("/users/logout")
            if (res.data?.success) {
                toast.success("Logged out successfully")
                setUserModal(false)
                setUser(null)
                navigate("/")
            }
        } catch (error) {
            toast.error(error.response?.message || "Something went wrong while logout")
        } finally {
            setIsLoadingLogout(false)
        }
    }

    const { data: cartItems = [] } = useQuery({
        queryKey: ["carts"],
        queryFn: async () => {
            const { data } = await api.get("/cart/get-carts");
            return data.data.items;
        },
        enabled: !!user,
    });
    const totalItems = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );
    const totalPrice = cartItems.reduce(
        (total, item) =>
            total + item.product.price * item.quantity,
        0
    );
    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 bg-surface shadow-[0_1px_4px_rgba(23,23,23,0.06)]">
                {/* Utility Bar */}
                <div className="hidden md:block bg-accent-light text-secondary py-1.5 px-4 text-xs border-b border-border/60">
                    <div className="max-w-7xl mx-auto flex items-center justify-between font-caption">
                        <div className="flex items-center gap-4 text-secondary font-medium">
                            <span className="flex items-center gap-1">
                                <span className="text-primary">
                                    <Truck size={16} />
                                </span>
                                Free shipping on orders over $50
                            </span>

                            <span className="text-border">|</span>

                            <span className="flex items-center gap-1">
                                <span className="text-primary">
                                    <Headset size={16} />
                                </span>
                                24/7 Customer Support
                            </span>

                            <span className="text-border hidden md:inline">|</span>

                            <span className="hidden md:flex items-center gap-1">
                                <span className="text-primary">
                                    <Smartphone size={16} />
                                </span>
                                Download the Cartora App
                            </span>
                        </div>

                        <div className="flex items-center gap-4 text-text-secondary">
                            <Link
                                className="hover:text-primary transition-colors text-xs font-medium hidden sm:inline"
                                to="/order-tracking"
                            >
                                Order Tracking
                            </Link>

                            <Link
                                className="hover:text-primary transition-colors text-xs font-medium hidden sm:inline"
                                to="/help"
                            >
                                Help Center
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Main Navigation */}
                <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-6">

                        {/* Logo */}
                        <Link
                            className="flex items-center gap-1 shrink-0 group"
                            to="/"
                        >

                            <div className="flex items-center justify-center text-primary">
                                <ShoppingCart size={24} strokeWidth={2.2} />
                            </div>
                            <span className="font-title text-[1.6rem] font-semibold tracking-tight text-text-primary group-hover:text-primary transition-colors">
                                Cartora
                            </span>
                        </Link>

                        {/* Search */}
                        <div className="flex-1 max-w-2xl hidden md:flex items-center">
                            <div className="w-full flex items-center bg-surface-container-low border border-border rounded-lg overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary shadow-sm transition-all">
                                <input
                                    type="text"
                                    placeholder="Search for products, brands and more..."
                                    className="w-full bg-transparent px-4 py-2 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none border-0"
                                />

                                <button
                                    className="bg-primary hover:bg-secondary text-on-primary px-5 py-2.5 flex items-center justify-center transition-colors shrink-0"
                                    type="button"
                                >
                                    <span className="material-symbols-outlined text-base">
                                        search
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Right Side */}
                        <div className="flex items-center gap-4">

                            {/* Wishlist */}
                            <Link
                                className="relative p-2 text-text-secondary hover:text-primary transition-colors rounded-lg flex items-center justify-center"
                                to="/wishlist"
                            >
                                <span>
                                    <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
                                </span>

                                <span className="absolute top-0 right-0 bg-accent-light text-primary text-[11px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                    0
                                </span>
                            </Link>

                            {/* Cart */}
                            {user ?
                                (<Link
                                    to="/cart"
                                    className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-surface border border-border hover:border-primary text-text-primary transition-all shadow-sm"
                                >
                                    <div className="relative flex items-center">
                                        <span className="text-primary">
                                            <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
                                        </span>

                                        <span className="absolute -top-1 -right-1 bg-primary text-on-primary text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                            {totalItems}
                                        </span>
                                    </div>

                                    <div className="text-left hidden sm:block">
                                        <span className="block text-[10px] uppercase font-bold text-text-secondary tracking-wider">
                                            Cart
                                        </span>

                                        <span className="block text-xs font-bold text-text-primary">
                                            Rs. {totalPrice.toLocaleString()}
                                        </span>
                                    </div>
                                </Link>) :
                                ""
                            }

                            {/* Account */}
                            {/* Login */}
                            {
                                isLoading ?
                                    (<div className="w-4 h-4 border-2 border-white/30 border-t-primary rounded-full animate-spin"></div>) :
                                    (
                                        <div className="relative flex justify-end items-center gap-4">
                                            {
                                                user ?
                                                    (
                                                        <>
                                                            <button
                                                                className="flex items-center gap-2 cursor-pointer"
                                                                onClick={() => setUserModal(!userModal)}
                                                            >
                                                                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-primary text-white flex items-center justify-center overflow-hidden">
                                                                    {user.profile_image ?
                                                                        (
                                                                            <img src={user.profile_image} className="w-full h-full object-cover" alt={user?.username?.charAt(0).toUpperCase()} />
                                                                        ) :
                                                                        (
                                                                            user?.username?.charAt(0).toUpperCase()
                                                                        )
                                                                    }
                                                                </div>
                                                            </button>
                                                            {
                                                                userModal ?
                                                                    (
                                                                        <div className="absolute right-0 top-full mt-3 w-64 bg-white rounded-xl shadow-lg border border-primary/10 p-4 z-50">

                                                                            {/* User Info */}
                                                                            <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                                                                                <div className="w-11 h-11 rounded-full bg-primary text-on-primary flex items-center justify-center font-semibold text-lg overflow-hidden">
                                                                                    {user.profile_image ?
                                                                                        (
                                                                                            <img src={user.profile_image} className="w-full h-full object-cover" alt={user?.username?.charAt(0).toUpperCase()} />
                                                                                        ) :
                                                                                        (
                                                                                            user?.username?.charAt(0).toUpperCase()
                                                                                        )
                                                                                    }
                                                                                </div>

                                                                                <div className="min-w-0">
                                                                                    <p className="font-semibold text-text-primary truncate">
                                                                                        {user?.username}
                                                                                    </p>

                                                                                    <p className="text-xs text-gray-500 truncate">
                                                                                        {user?.email}
                                                                                    </p>
                                                                                </div>
                                                                            </div>

                                                                            {/* Menu */}
                                                                            <div className="pt-2 space-y-1">
                                                                                <NavLink
                                                                                    to="/profile"
                                                                                    className={({ isActive }) => `${isActive ? "bg-primary/5 text-primary" : "text-text-primary hover:bg-primary/5 hover:text-primary transition-colors"} flex items-center gap-3 px-3 py-2 rounded-lg text-sm`}
                                                                                    onClick={() => setIsOpen(false)}
                                                                                >
                                                                                    <User size={17} />
                                                                                    My Profile
                                                                                </NavLink>

                                                                                <Link
                                                                                    to="/orders"
                                                                                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-text-primary hover:bg-primary/5 hover:text-primary transition-colors"
                                                                                    onClick={() => setIsOpen(false)}
                                                                                >
                                                                                    <ShoppingBag size={17} />
                                                                                    My Orders
                                                                                </Link>

                                                                                <button
                                                                                    onClick={() => handleLogout()}
                                                                                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors"
                                                                                >
                                                                                    <LogOut size={17} />
                                                                                    {
                                                                                        isLoadingLogout ? "Loggin out..." : "Logout"
                                                                                    }
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    ) :
                                                                    ""
                                                            }
                                                        </>
                                                    ) :
                                                    (
                                                        <>
                                                            <Link
                                                                to="/login"
                                                                className="text-sm font-semibold text-text-primary hover:text-primary transition-colors"
                                                            >
                                                                Login
                                                            </Link>
                                                            <Link
                                                                to="/signup"
                                                                className="px-4 py-2 rounded-lg bg-primary hover:bg-secondary text-on-primary text-sm font-semibold transition-colors shadow-sm"
                                                            >
                                                                Sign Up
                                                            </Link>
                                                        </>
                                                    )
                                            }
                                        </div>
                                    )
                            }
                        </div>
                    </div>
                    {/* Search */}
                    <div className="flex-1 max-w-2xl flex md:hidden items-center">
                        <div className="w-full flex items-center bg-surface-container-low border border-border rounded-lg overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary shadow-sm transition-all">
                            <input
                                type="text"
                                placeholder="Search for products, brands and more..."
                                className="w-full bg-transparent px-4 py-1.5 text-[16px] text-text-primary placeholder:text-text-secondary placeholder:text-[14px] focus:outline-none border-0"
                            />

                            <button
                                className="bg-primary hover:bg-secondary text-on-primary px-5 py-2.5 h-full flex items-center justify-center transition-colors shrink-0"
                                type="button"
                            >
                                <Search size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Category Navigation */}
                <div className="bg-surface border-t border-border px-4">
                    <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto text-sm font-medium">

                        <div className="flex items-center gap-6 py-2.5">

                            <button
                                className="flex items-center gap-2 text-text-primary font-bold hover:text-primary transition-colors py-1 shrink-0"
                                type="button"
                            >
                                <span className="text-primary">
                                    <Menu size={16} strokeWidth={2.75} />
                                </span>
                                <span>All Categories</span>
                            </button>

                            <span className="h-4 w-px bg-border shrink-0"></span>

                            {CATEGORIES.map((category) => (
                                <Link
                                    key={category.value}
                                    className="text-text-secondary hover:text-primary transition-colors shrink-0"
                                    to={`/category/${category.slug}`}
                                >
                                    {category.label}
                                </Link>
                            ))}

                            <Link
                                className="text-primary font-semibold flex items-center gap-1 hover:text-secondary transition-colors shrink-0"
                                to="/deals"
                            >
                                <span className="text-primary">
                                    <Flame size={16} />
                                </span>

                                Today's Deals

                                <span className="bg-accent-light text-primary text-[10px] font-bold px-1.5 py-0.2 rounded-full uppercase">
                                    Sale
                                </span>
                            </Link>

                            <Link
                                className="text-text-secondary hover:text-primary transition-colors shrink-0"
                                to="/new-arrivals"
                            >
                                New Arrivals
                            </Link>

                            <Link
                                className="text-text-secondary hover:text-primary transition-colors shrink-0"
                                to="/best-sellers"
                            >
                                Best Sellers
                            </Link>
                        </div>
                    </div>
                </div>
            </header >
            {
            }
        </>
    );
};

export default Header;