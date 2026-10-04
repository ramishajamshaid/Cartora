import { useState } from "react";
import { Link } from "react-router-dom";
import { User, ShoppingBag, LogOut } from "lucide-react";

const UserMenu = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative z-100">
            {/* User Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
                <div className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center font-semibold">
                    {user?.username?.charAt(0).toUpperCase()}
                </div>

                <span className="text-sm font-semibold text-text-primary">
                    {user?.username}
                </span>
            </button>

            {/* User Modal */}
            {isOpen && (
                <div className="absolute right-0 top-full mt-3 w-64 bg-white rounded-xl shadow-lg border border-primary/10 p-4 z-50">

                    {/* User Info */}
                    <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                        <div className="w-11 h-11 rounded-full bg-primary text-on-primary flex items-center justify-center font-semibold text-lg">
                            {user?.username?.charAt(0).toUpperCase()}
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
                        <Link
                            to="/profile"
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-text-primary hover:bg-primary/5 hover:text-primary transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <User size={17} />
                            My Profile
                        </Link>

                        <Link
                            to="/orders"
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-text-primary hover:bg-primary/5 hover:text-primary transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <ShoppingBag size={17} />
                            My Orders
                        </Link>

                        <button
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors"
                        >
                            <LogOut size={17} />
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;