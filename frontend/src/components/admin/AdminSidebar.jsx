import { NavLink, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Store,
    Tags,
    Settings,
    LogOut,
} from "lucide-react";

const navItems = [
    {
        name: "Dashboard",
        path: "/admin",
        icon: LayoutDashboard,
    },
    {
        name: "Products",
        path: "/admin/products",
        icon: Package,
    },
    {
        name: "Orders",
        path: "/admin/orders",
        icon: ShoppingCart,
    },
    {
        name: "Users",
        path: "/admin/users",
        icon: Users,
    },
    {
        name: "Sellers",
        path: "/admin/sellers",
        icon: Store,
    },
    {
        name: "Categories",
        path: "/admin/categories",
        icon: Tags,
    },
    {
        name: "Settings",
        path: "/admin/settings",
        icon: Settings,
    },
];

const AdminSidebar = () => {
    const location = useLocation();
    return (
        <aside className="hidden md:flex h-screen w-64 flex-col justify-between border-r border-border bg-white">

            {/* Logo */}
            <div>
                <div
                    className="flex items-center gap-1 h-16 shrink-0 group border-b border-border px-6"
                >

                    <div className="flex items-center justify-center text-primary">
                        <ShoppingCart size={24} strokeWidth={2.2} />
                    </div>
                    <span className="font-title text-[1.6rem] font-semibold tracking-tight text-text-primary group-hover:text-primary transition-colors">
                        Cartora
                    </span>
                </div>

                {/* Navigation */}
                <nav className="mt-5 flex flex-col gap-1 px-3">
                    {navItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                end={item.path === "/admin"}
                                className={({ isActive }) => {
                                    const isSellerDetail =
                                        item.name === "Sellers" &&
                                        location.pathname.startsWith("/admin/seller-detail/");
                                    const isProductDetail =
                                        item.name === "Products" &&
                                        location.pathname.startsWith("/admin/product-detail/");
                                    const isUserDetail =
                                        item.name === "Users" &&
                                        location.pathname.startsWith("/admin/user-detail/");

                                    const active = isActive || isSellerDetail || isProductDetail || isUserDetail;

                                    return `flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${active
                                            ? "bg-[#F3E8DF] text-[#954518]"
                                            : "text-text-secondary hover:bg-[#F6F3F2] hover:text-[#171717]"
                                        }`;
                                }}
                            >
                                <Icon size={19} strokeWidth={1.8} />
                                <span>{item.name}</span>
                            </NavLink>
                        );
                    })}
                </nav>
            </div>

            {/* Admin Profile + Logout */}
            <div className="m-4 rounded-xl bg-[#F6F3F2] p-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#954518] text-sm font-semibold text-white">
                        A
                    </div>

                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[#171717]">
                            Admin
                        </p>
                        <p className="truncate text-xs text-text-secondary">
                            Administrator
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default AdminSidebar;