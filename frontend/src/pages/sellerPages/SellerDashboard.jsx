import {
    ArrowRight,
    Clock3,
    Package,
    Plus,
    ReceiptText,
    Store,
    Truck,
    Wallet,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from '../../api/api'
import { useQuery } from "@tanstack/react-query";
import SellerDashboardStat from "../../components/seller/SellerDashboardStat";

function SellerDashboard() {
    const navigate = useNavigate();

    const getSellerDashboardData = async()=>{
        const {data} = await api.get("/seller/get-seller-dashboard-data")
        return data.data
    }

    const {data=[], isLoading, isError} = useQuery({
        queryKey: ["sellerDashboardData"],
        queryFn: getSellerDashboardData,
    })

    const stats = data?.stats;
    const recentProducts = data?.recentProducts || []
    const store = data?.store

    const orders = [
        {
            id: "#ORD-9844",
            customer: "Sarah Jenkins",
            date: "May 29",
            total: "$118.00",
            status: "Pending",
        },
        {
            id: "#ORD-9842",
            customer: "David Miller",
            date: "May 28",
            total: "$148.00",
            status: "Processing",
        },
        {
            id: "#ORD-9839",
            customer: "Alex Rivera",
            date: "May 27",
            total: "$165.00",
            status: "Shipped",
        },
        {
            id: "#ORD-9835",
            customer: "Marcus Vance",
            date: "May 26",
            total: "$84.00",
            status: "Delivered",
        },
    ];

    const statusStyles = {
        pending: "bg-surface-container text-warning",
        processing: "bg-tertiary-fixed-dim/20 text-tertiary",
        shipped: "bg-secondary-fixed/40 text-secondary",
        delivered: "bg-surface-container text-success",
        active: "bg-surface-container text-success",
        "Low Stock": "bg-surface-container text-warning",
    };

    return (
        <div className="flex w-full flex-col gap-6 py-6 px-2">

            {/* Header */}
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                    <div className="mb-1 flex items-center gap-1 text-xs text-text-secondary">
                        <span>Seller Portal</span>
                        <ArrowRight size={13} />
                        <span className="font-medium text-primary">
                            Dashboard
                        </span>
                    </div>

                    <h1 className="font-display text-2xl font-semibold tracking-tight text-on-surface">
                        Welcome back, Seller
                    </h1>

                    <p className="mt-1 text-sm text-text-secondary">
                        Here is what's happening with your store today.
                    </p>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => navigate("/seller/store")}
                        className="flex items-center gap-1.5 rounded-lg bg-surface px-3.5 py-2 text-xs font-semibold text-on-surface shadow-sm transition hover:bg-surface-container-low"
                    >
                        <Store size={17} />
                        Manage Store
                    </button>

                    <button
                        onClick={() => navigate("/seller/orders")}
                        className="flex items-center gap-1.5 rounded-lg bg-surface px-3.5 py-2 text-xs font-semibold text-on-surface shadow-sm transition hover:bg-surface-container-low"
                    >
                        <ReceiptText size={17} />
                        View Orders
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <SellerDashboardStat
                    title="Total Products"
                    value={stats?.totalProducts || 0}
                    Icon={Package}
                    description={`${stats?.totalProducts} Active`}
                />
                <SellerDashboardStat
                    title="Total Orders"
                    value={stats?.totalOrders || 0}
                    Icon={ReceiptText}
                    description={`${stats?.totalProducts} Active`}
                />
                <SellerDashboardStat
                    title="Pending Orders"
                    value={stats?.pendingOrders || 0}
                    Icon={Clock3}
                    description={`Requires dispatch today`}
                />
                <SellerDashboardStat
                    title="Total Revenue"
                    value={stats?.totalRevenue || 0}
                    Icon={Wallet}
                    description={`Net earning this cycle`}
                />
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">

                {/* Recent Orders & Products*/}
                <div className="space-y-6 lg:col-span-8">
                    {/* Orders */}
                    <div className="overflow-hidden rounded-xl bg-surface shadow-sm">
                        <div className="flex items-center justify-between px-6 py-4">
                            <div>
                                <h2 className="text-lg font-semibold text-on-surface">
                                    Recent Orders
                                </h2>

                                <p className="mt-0.5 text-xs text-text-secondary">
                                    Your latest customer orders
                                </p>
                            </div>

                            <button
                                onClick={() =>
                                    navigate("/seller/orders")
                                }
                                className="flex items-center gap-1 text-xs font-semibold text-primary"
                            >
                                View All
                                <ArrowRight size={15} />
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-surface-container-low text-xs uppercase tracking-wider text-text-secondary">
                                        <th className="px-6 py-3">
                                            Order ID
                                        </th>
                                        <th className="px-4 py-3">
                                            Customer
                                        </th>
                                        <th className="px-4 py-3">
                                            Date
                                        </th>
                                        <th className="px-4 py-3">
                                            Total
                                        </th>
                                        <th className="px-4 py-3">
                                            Status
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-surface-container-low text-sm">
                                    {orders.map((order) => (
                                        <tr
                                            key={order.id}
                                            className="transition hover:bg-surface-container-low/60"
                                        >
                                            <td className="px-6 py-3.5 font-medium text-on-surface">
                                                {order.id}
                                            </td>

                                            <td className="px-4 py-3.5 text-on-surface">
                                                {order.customer}
                                            </td>

                                            <td className="px-4 py-3.5 text-text-secondary">
                                                {order.date}
                                            </td>

                                            <td className="px-4 py-3.5 font-semibold text-on-surface">
                                                {order.total}
                                            </td>

                                            <td className="px-4 py-3.5">
                                                <span
                                                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[order.status]}`}
                                                >
                                                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Products */}
                    <div className="overflow-hidden rounded-xl bg-surface shadow-sm">
                        <div className="flex items-center justify-between px-6 py-4">
                            <div>
                                <h2 className="text-lg font-semibold text-on-surface">
                                    Recently Added Products
                                </h2>

                                <p className="mt-0.5 text-xs text-text-secondary">
                                    Your latest catalog activity
                                </p>
                            </div>

                            <button
                                onClick={() =>
                                    navigate("/seller/products")
                                }
                                className="flex items-center gap-1 text-xs font-semibold text-primary"
                            >
                                View All
                                <ArrowRight size={15} />
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-surface-container-low text-xs uppercase tracking-wider text-text-secondary">
                                        <th className="px-6 py-3">
                                            Product
                                        </th>
                                        <th className="px-4 py-3">
                                            Price
                                        </th>
                                        <th className="px-4 py-3">
                                            Stock
                                        </th>
                                        <th className="px-4 py-3">
                                            Status
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-surface-container-low text-sm">
                                    {recentProducts.map((product) => (
                                        <tr
                                            key={product._id}
                                            className="transition hover:bg-surface-container-low/60"
                                        >
                                            <td className="px-6 py-3.5">
                                                <div>
                                                    <p className="font-medium text-on-surface">
                                                        {product.title}
                                                    </p>

                                                    <p className="text-xs text-text-secondary">
                                                        {product.category}
                                                    </p>
                                                </div>
                                            </td>

                                            <td className="py-3.5 font-semibold text-on-surface">
                                                Rs. {product.price}
                                            </td>

                                            <td className="px-4 py-3.5 text-on-surface">
                                                {product.stock}
                                            </td>

                                            <td className="px-4 py-3.5">
                                                <span
                                                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[product.status]}`}
                                                >
                                                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                                    {product.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6 lg:col-span-4">

                    {/* Dispatch */}
                    <div className="flex items-start gap-3 rounded-xl bg-accent-light p-4 shadow-sm">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface text-primary">
                            <Truck size={20} />
                        </div>

                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-on-surface">
                                    Daily Dispatch
                                </span>

                                <span className="h-2 w-2 rounded-full bg-warning" />
                            </div>

                            <p className="mt-1 text-xs leading-5 text-on-surface-variant">
                                <span className="font-semibold text-primary">
                                    7 orders
                                </span>{" "}
                                are ready for dispatch today.
                            </p>
                        </div>
                    </div>

                    {/* Store Overview */}
                    <div className="space-y-4 rounded-xl bg-surface p-6 shadow-sm">
                        <div className="flex items-start gap-3">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-light text-primary overflow-hidden">
                                {
                                    store?.storeLogo?
                                    (<img src={store?.storeLogo} alt={store?.storeName}/>):
                                    <Store size={25} />
                                }
                            </div>

                            <div>
                                <h3 className="text-base font-semibold text-on-surface">
                                    {store?.storeName}
                                </h3>

                                <p className="text-xs text-text-secondary line-clamp-2">
                                    {store?.storeDescription}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between rounded-lg bg-surface-container-low px-3 py-2.5 text-xs">
                            <span className="text-text-secondary">
                                Status
                            </span>

                            <span className="flex items-center gap-1 font-semibold text-success">
                                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                                Active
                            </span>
                        </div>

                        <button
                            onClick={() =>
                                navigate("/seller/store")
                            }
                            className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-surface-container-low py-2.5 text-xs font-semibold text-on-surface transition hover:bg-surface-container"
                        >
                            <Store size={17} />
                            Manage Store
                        </button>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-2 rounded-xl bg-surface p-6 shadow-sm">
                        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                            Quick Actions
                        </h3>

                        <button
                            onClick={() =>
                                navigate("/seller/products")
                            }
                            className="flex w-full items-center justify-between rounded-lg bg-surface-container-low p-3 transition hover:bg-surface-container"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface text-primary">
                                    <Plus size={20} />
                                </div>

                                <div className="text-left">
                                    <p className="text-sm font-semibold text-on-surface">
                                        Add Product
                                    </p>

                                    <p className="text-xs text-text-secondary">
                                        Create a new product
                                    </p>
                                </div>
                            </div>

                            <ArrowRight
                                size={17}
                                className="text-text-secondary"
                            />
                        </button>

                        <button
                            onClick={() =>
                                navigate("/seller/orders")
                            }
                            className="flex w-full items-center justify-between rounded-lg bg-surface-container-low p-3 transition hover:bg-surface-container"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface text-primary">
                                    <ReceiptText size={20} />
                                </div>

                                <div className="text-left">
                                    <p className="text-sm font-semibold text-on-surface">
                                        View Orders
                                    </p>

                                    <p className="text-xs text-text-secondary">
                                        Manage customer orders
                                    </p>
                                </div>
                            </div>

                            <ArrowRight
                                size={17}
                                className="text-text-secondary"
                            />
                        </button>

                        <button
                            onClick={() =>
                                navigate("/seller/store")
                            }
                            className="flex w-full items-center justify-between rounded-lg bg-surface-container-low p-3 transition hover:bg-surface-container"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface text-primary">
                                    <Store size={20} />
                                </div>

                                <div className="text-left">
                                    <p className="text-sm font-semibold text-on-surface">
                                        Manage Store
                                    </p>

                                    <p className="text-xs text-text-secondary">
                                        Update store details
                                    </p>
                                </div>
                            </div>

                            <ArrowRight
                                size={17}
                                className="text-text-secondary"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SellerDashboard;