import { ArrowBigLeft, ArrowLeft, ShoppingCart } from 'lucide-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function AuthHeader() {
    const navigate = useNavigate()
    return (
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl shadow-[0_1px_4px_rgba(23,23,23,0.06)]">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-4 py-3">
                {/* Logo */}
                <Link
                    className="flex items-center gap-1 shrink-0 group"
                    to="/"
                >

                    <div className="flex items-center justify-center text-primary">
                        <ShoppingCart size={24} strokeWidth={2.2}/>
                    </div>
                    <span className="font-title text-[1.6rem] font-semibold tracking-tight text-text-primary group-hover:text-primary transition-colors">
                        Cartora
                    </span>
                </Link>

                {/* back */}
                <button
                onClick={()=>navigate(-1)}
                    className="p-2 text-text-secondary hover:text-primary transition-colors rounded-lg flex items-center justify-center gap-1 cursor-pointer"
                >
                    <span>
                        <ArrowLeft size={20} />
                    </span>

                    <span className="text-[14px] font-bold rounded-full flex items-center justify-center">
                        back to store
                    </span>
                </button>
            </div>
        </header>
    )
}

export default AuthHeader
