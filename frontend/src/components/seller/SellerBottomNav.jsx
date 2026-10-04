import {
    LayoutDashboard,
    Package,
    ReceiptText,
    Store,
    Settings,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

function SellerBottomNav() {
    const location = useLocation();

    const navItems = [
        {
            name: "Dashboard",
            path: "/seller",
            icon: LayoutDashboard,
        },
        {
            name: "Products",
            path: "/seller/products",
            icon: Package,
        },
        {
            name: "Orders",
            path: "/seller/orders",
            icon: ReceiptText,
        },
        {
            name: "Store",
            path: "/seller/store",
            icon: Store,
        },
        {
            name: "Settings",
            path: "/seller/settings",
            icon: Settings,
        },
    ];

    return (
        <nav className="fixed bottom-0 left-0 z-50 md:hidden flex w-full items-center justify-around border-t border-[#E8E2DF] bg-surface px-2 py-2 shadow-[0_-2px_10px_rgba(70,48,38,0.06)] lg:hidden">
            {navItems.map((item) => {
                const Icon = item.icon;

                return (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        end={item.path === "/seller"}
                        className={({ isActive }) => {
                            const isAddProduct =
                                item.name === "Products" &&
                                location.pathname.startsWith(
                                    "/seller/add-product"
                                );

                            const isDetailProduct =
                                item.name === "Products" &&
                                location.pathname.startsWith(
                                    "/seller/product-detail"
                                );

                            const active =
                                isActive ||
                                isAddProduct ||
                                isDetailProduct;

                            return `flex min-w-0 flex-1 flex-col items-center gap-1 rounded-lg py-1.5 text-[11px] font-medium transition-colors ${
                                active
                                    ? "text-[#954518]"
                                    : "text-text-secondary"
                            }`;
                        }}
                    >
                        {({ isActive }) => {
                            const isAddProduct =
                                item.name === "Products" &&
                                location.pathname.startsWith(
                                    "/seller/add-product"
                                );

                            const isDetailProduct =
                                item.name === "Products" &&
                                location.pathname.startsWith(
                                    "/seller/product-detail"
                                );

                            const active =
                                isActive ||
                                isAddProduct ||
                                isDetailProduct;

                            return (
                                <>
                                    <div
                                        className={`flex h-8 w-12 items-center justify-center rounded-full transition-colors`}
                                    >
                                        <Icon
                                            size={20}
                                            strokeWidth={active ? 2.2 : 2}
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
}

export default SellerBottomNav;