import {
    LayoutDashboard,
    Package,
    ReceiptText,
    Store,
    Settings,
    BadgeCheck,
    Headphones,
    ShoppingCart,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

function SellerSidebar() {
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
    const location = useLocation();

    return (
        <aside className="hidden md:flex h-screen w-64 flex-col justify-between bg-surface shadow-[0_1px_8px_rgba(70,48,38,0.04)]">
            <div>
                {/* Logo */}
                <div className="flex flex-col items-start px-6 py-2">
                    <div
                        className="flex items-center gap-1 shrink-0 group"
                    >

                        <div className="flex items-center justify-center text-primary">
                            <ShoppingCart size={24} strokeWidth={2.2} />
                        </div>
                        <span className="font-title text-[1.6rem] font-semibold tracking-tight text-text-primary group-hover:text-primary transition-colors">
                            Cartora
                        </span>
                    </div>
                </div>

                {/* Store Info */}
                <div className="mx-4 my-2 flex items-center gap-2 rounded-lg bg-surface-container-low p-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-light text-primary">
                        <Store size={18} />
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col">
                        <span className="truncate text-xs font-semibold text-on-surface">
                            Your Store
                        </span>

                        <span className="flex items-center gap-1 text-xs text-success">
                            <span className="h-1.5 w-1.5 rounded-full bg-success" />
                            Live Store
                        </span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-1 px-4 py-2">
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
                                        location.pathname.startsWith("/seller/add-product");
                                    const isDetailProduct =
                                        item.name === "Products" &&
                                        location.pathname.startsWith("/seller/product-detail");

                                    const active = isActive || isAddProduct || isDetailProduct;

                                    return `flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${active
                                        ? "bg-[#F3E8DF] text-[#954518]"
                                        : "text-text-secondary hover:bg-[#F6F3F2] hover:text-[#171717]"
                                        }`;
                                }}
                            >
                                <Icon size={20} />
                                <span>{item.name}</span>
                            </NavLink>
                        );
                    })}
                </nav>
            </div>

            {/* Support */}
            <div className="m-4 flex flex-col gap-1 rounded-xl bg-accent-light p-4">
                <div className="flex items-center gap-2 text-primary">
                    <BadgeCheck size={18} />

                    <span className="text-xs font-semibold">
                        Seller Support
                    </span>
                </div>

                <p className="text-xs leading-5 text-secondary">
                    Need help managing your store? Contact support anytime.
                </p>

                <button className="mt-2 flex items-center gap-2 text-xs font-semibold text-primary hover:underline">
                    <Headphones size={15} />
                    Contact Support
                </button>
            </div>
        </aside>
    );
}

export default SellerSidebar;