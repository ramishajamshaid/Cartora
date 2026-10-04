import {
    Bell,
    ChevronDown,
    LogOut,
    Settings,
    Store,
    User,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SellerHeader() {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);

    return (
        <header className="fixed left-0 md:left-64 right-0 top-0 z-40 flex h-16 items-center justify-between bg-surface/90 px-6 backdrop-blur-xl shadow-[0_1px_8px_rgba(70,48,38,0.04)]">
            
            {/* Search */}
            <div className="relative w-full max-w-md">
                <h2 className="text-[16px] font-medium font-title text-[#171717]">Seller Dashboard</h2>
            </div>

            <div className="ml-6 flex items-center gap-3">
                {/* Notifications */}
                <button
                    type="button"
                    className="relative rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
                >
                    <Bell size={21} />

                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-error ring-2 ring-surface" />
                </button>

                {/* Profile */}
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setShowMenu((prev) => !prev)}
                        className="flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-surface-container-low"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-light text-sm font-semibold text-primary">
                            S
                        </div>

                        <div className="hidden flex-col text-left md:flex">
                            <span className="text-xs font-semibold leading-tight text-on-surface">
                                Seller
                            </span>

                            <span className="text-xs leading-tight text-text-secondary">
                                Your Store
                            </span>
                        </div>

                        <ChevronDown
                            size={17}
                            className="text-text-secondary"
                        />
                    </button>

                    {showMenu && (
                        <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl bg-surface py-2 shadow-[0_12px_24px_-4px_rgba(70,48,38,0.09)]">
                            <div className="px-4 py-2">
                                <p className="truncate text-sm font-semibold text-on-surface">
                                    Seller
                                </p>

                                <p className="truncate text-xs text-text-secondary">
                                    seller@example.com
                                </p>
                            </div>

                            <div className="my-1 h-px bg-surface-container" />

                            <button
                                onClick={() => navigate("/seller/store")}
                                className="flex w-full items-center gap-3 px-4 py-2 text-sm text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
                            >
                                <Store size={18} />
                                Store
                            </button>

                            <button
                                onClick={() => navigate("/seller/settings")}
                                className="flex w-full items-center gap-3 px-4 py-2 text-sm text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
                            >
                                <User size={18} />
                                My Profile
                            </button>

                            <button
                                onClick={() => navigate("/seller/settings")}
                                className="flex w-full items-center gap-3 px-4 py-2 text-sm text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
                            >
                                <Settings size={18} />
                                Settings
                            </button>

                            <div className="my-1 h-px bg-surface-container" />

                            <button className="flex w-full items-center gap-3 px-4 py-2 text-sm text-error hover:bg-surface-container-low">
                                <LogOut size={18} />
                                Log Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default SellerHeader;