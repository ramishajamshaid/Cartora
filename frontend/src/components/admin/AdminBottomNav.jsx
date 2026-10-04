import { NavLink, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Store,
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
];

const AdminBottomNav = () => {
    const location = useLocation();

    return (
        <nav className="fixed bottom-0 left-0 z-50 flex md:hidden w-full items-center justify-around border-t border-border bg-white px-2 py-2 shadow-[0_-2px_10px_rgba(70,48,38,0.06)] lg:hidden">
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
                                location.pathname.startsWith(
                                    "/admin/seller-detail/"
                                );

                            const isProductDetail =
                                item.name === "Products" &&
                                location.pathname.startsWith(
                                    "/admin/product-detail/"
                                );

                            const isUserDetail =
                                item.name === "Users" &&
                                location.pathname.startsWith(
                                    "/admin/user-detail/"
                                );

                            const active =
                                isActive ||
                                isSellerDetail ||
                                isProductDetail ||
                                isUserDetail;

                            return `flex flex-1 flex-col items-center gap-1 rounded-lg py-1.5 text-[10px] font-medium transition-colors ${
                                active
                                    ? "text-[#954518]"
                                    : "text-text-secondary"
                            }`;
                        }}
                    >
                        {({ isActive }) => {
                            const isSellerDetail =
                                item.name === "Sellers" &&
                                location.pathname.startsWith(
                                    "/admin/seller-detail/"
                                );

                            const isProductDetail =
                                item.name === "Products" &&
                                location.pathname.startsWith(
                                    "/admin/product-detail/"
                                );

                            const isUserDetail =
                                item.name === "Users" &&
                                location.pathname.startsWith(
                                    "/admin/user-detail/"
                                );

                            const active =
                                isActive ||
                                isSellerDetail ||
                                isProductDetail ||
                                isUserDetail;

                            return (
                                <>
                                    <div
                                        className={`flex h-8 w-12 items-center justify-center rounded-full`}
                                    >
                                        <Icon
                                            size={19}
                                            strokeWidth={active ? 2.2 : 1.8}
                                        />
                                    </div>

                                    <span>{item.name}</span>
                                </>
                            );
                        }}
                    </NavLink>
                );
            })}
        </nav>
    );
};

export default AdminBottomNav;