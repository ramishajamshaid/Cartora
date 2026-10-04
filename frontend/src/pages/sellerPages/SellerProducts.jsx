import { useMemo, useState } from "react";
import {
    Search,
    Download,
    Upload,
    Plus,
    Store,
    Package,
    AlertTriangle,
    FileEdit,
    XCircle,
    SlidersHorizontal,
    ChevronDown,
    RefreshCw,
    Eye,
    Pencil,
    Trash2,
    ChevronLeft,
    ChevronRight,
    ChevronRight as BreadcrumbArrow,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { useQuery } from "@tanstack/react-query";
import { formateDate } from "../../calculations";
import { CATEGORIES } from "../../data/categories";
import Loader from '../../components/helpers/Loader'


const productsData = [
    {
        id: 1,
        name: "Aura Kinetic Runner",
        sku: "CRT-FW-1033",
        variant: "4 Colorways",
        category: "Footwear",
        price: 148,
        stock: 24,
        status: "Active",
        createdAt: "May 12, 2025",
        image: "",
    },
    {
        id: 2,
        name: "Aura Prism Pro 256GB",
        sku: "CRT-TC-502",
        variant: "Sandstone",
        category: "Electronics",
        price: 899,
        stock: 4,
        status: "Low Stock",
        createdAt: "Apr 28, 2025",
        image: "",
    },
    {
        id: 3,
        name: "Aethera NC-X Wireless",
        sku: "CRT-AU-8210",
        variant: "Matte Copper",
        category: "Audio",
        price: 240,
        stock: 18,
        status: "Active",
        createdAt: "Apr 15, 2025",
        image: "",
    },
    {
        id: 4,
        name: "Raw Loom Linen Overshirt",
        sku: "CRT-TX-104",
        variant: "Oatmeal / Unisex",
        category: "Apparel",
        price: 118,
        stock: 65,
        status: "Active",
        createdAt: "Mar 20, 2025",
        image: "",
    },
    {
        id: 5,
        name: "Saddle Leather Utility Tote",
        sku: "CRT-BG-774",
        variant: "Cognac Veg-tan",
        category: "Bags",
        price: 165,
        stock: 12,
        status: "Draft",
        createdAt: "Feb 14, 2025",
        image: "",
    },
    {
        id: 6,
        name: "Cedar Soy Candle 8oz",
        sku: "CRT-HM-301",
        variant: "Amber Jar",
        category: "Home & Living",
        price: 42,
        stock: 0,
        status: "Out of Stock",
        createdAt: "Jan 10, 2025",
        image: "",
    },
];


const SellerProducts = () => {
    const [activeTab, setActiveTab] = useState("All");
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [stockStatus, setStockStatus] = useState("");
    const [selectedProducts, setSelectedProducts] = useState([]);
    const navigate = useNavigate()

    const getProducts = async () => {
        const { data } = await api.get("/product/get-seller-products")
        return data.data;
    }

    const { data = [], isLoading, isError } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
    })


    const filteredProducts = useMemo(() => {
        return data.filter((product) => {

            const matchesSearch =
                product.title.toLowerCase().includes(search.toLowerCase()) ||
                product.sku.toLowerCase().includes(search.toLowerCase());

            const matchesCategory =
                !category || product.category === category;

            let matchesStock = true;

            if (stockStatus === "in_stock") {
                matchesStock = product.stock > 5;
            }

            if (stockStatus === "low_stock") {
                matchesStock = product.stock > 0 && product.stock <= 5;
            }

            if (stockStatus === "out_stock") {
                matchesStock = product.stock === 0;
            }

            const matchesTab =
                activeTab === "All" ||
                (activeTab === "Active" && product.status === "active") ||
                (activeTab === "Low Stock" && product.status === "Low Stock") ||
                (activeTab === "Draft" && product.status === "draft");

            return (
                matchesSearch &&
                matchesCategory &&
                matchesStock &&
                matchesTab
            );
        });
    }, [data, activeTab, search, category, stockStatus]);


    const toggleProduct = (id) => {
        setSelectedProducts((prev) =>
            prev.includes(id)
                ? prev.filter((productId) => productId !== id)
                : [...prev, id]
        );
    };


    const toggleAll = () => {
        if (selectedProducts.length === filteredProducts.length) {
            setSelectedProducts([]);
        } else {
            setSelectedProducts(filteredProducts.map((product) => product.id));
        }
    };


    const resetFilters = () => {
        setSearch("");
        setCategory("");
        setStockStatus("");
        setActiveTab("All");
    };


    const getStatusStyles = (status) => {
        switch (status) {
            case "active":
                return "bg-success/10 text-success";

            case "Low Stock":
                return "bg-warning/10 text-warning";

            case "draft":
                return "bg-surface-container-low text-text-secondary";

            case "Out of Stock":
                return "bg-error/10 text-error";

            default:
                return "bg-surface-container-low text-text-secondary";
        }
    };


    const getStockColor = (stock) => {
        if (stock === 0) return "bg-error";
        if (stock <= 5) return "bg-warning";
        return "bg-success";
    };


    return (
        <div className="px-2 py-4 flex flex-col gap-6">
            {/* Breadcrumb + Heading */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                <div>
                    <div className="flex items-center gap-1.5 text-xs text-text-secondary mb-1">
                        <span>Seller Portal</span>
                        <BreadcrumbArrow size={14} />
                        <span className="text-text-primary font-semibold">
                            Products
                        </span>
                    </div>

                    <div className="flex items-baseline gap-2">
                        <h1 className="text-2xl md:text-3xl font-semibold text-text-primary tracking-tight">
                            Products
                        </h1>

                        <span className="text-xs text-text-secondary">
                            {productsData.length} total catalog items
                        </span>
                    </div>
                </div>


                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2">
                    <button
                        type="button"
                        onClick={() => navigate("/seller/add-product")}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white hover:bg-secondary transition-colors text-sm font-semibold"
                    >
                        <Plus size={19} />
                        Add Product
                    </button>
                </div>
            </div>


            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                <StatCard
                    label="Live Listings"
                    value="42"
                    description="+3 this week"
                    icon={<Store size={21} />}
                    descriptionClass="text-success"
                />

                <StatCard
                    label="Low Stock Alert"
                    value="4"
                    description="Action needed"
                    icon={<AlertTriangle size={21} />}
                    valueClass="text-warning"
                    descriptionClass="text-warning"
                    iconClass="text-warning bg-surface-container-low"
                />

                <StatCard
                    label="Draft Items"
                    value="2"
                    description="Unpublished edits"
                    icon={<FileEdit size={21} />}
                    iconClass="text-text-secondary bg-surface-container-low"
                />

                <StatCard
                    label="Out of Stock"
                    value="1"
                    description="Cedar Soy Candle 8oz"
                    icon={<XCircle size={21} />}
                    valueClass="text-error"
                    descriptionClass="text-error"
                    iconClass="text-error bg-surface-container-low"
                />

            </div>


            {/* Filters */}
            <div className="bg-surface rounded-xl shadow-sm p-4 flex flex-col gap-4">

                {/* Tabs */}
                <div className="flex flex-wrap items-center justify-between gap-3">

                    <div className="flex items-center gap-1 p-1 bg-surface-container-low rounded-lg overflow-x-auto">

                        {["All", "Active", "Low Stock", "Draft"].map((tab) => (
                            <button
                                key={tab}
                                type="button"
                                onClick={() => setActiveTab(tab)}
                                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-colors ${activeTab === tab
                                    ? "bg-surface text-primary shadow-sm"
                                    : "text-text-secondary hover:text-text-primary"
                                    }`}
                            >
                                {tab}

                                <span
                                    className={`px-1.5 py-0.5 rounded-full text-[10px] ${activeTab === tab
                                        ? "bg-accent-light text-primary"
                                        : "bg-surface-container text-text-secondary"
                                        }`}
                                >
                                    {tab === "All"
                                        ? productsData.length
                                        : tab === "Active"
                                            ? productsData.filter(
                                                (p) => p.status === "Active"
                                            ).length
                                            : tab === "Low Stock"
                                                ? productsData.filter(
                                                    (p) => p.status === "Low Stock"
                                                ).length
                                                : productsData.filter(
                                                    (p) => p.status === "Draft"
                                                ).length}
                                </span>
                            </button>
                        ))}

                    </div>


                    <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                        <SlidersHorizontal size={15} />

                        <span>Sorted by:</span>

                        <button
                            type="button"
                            className="font-semibold text-text-primary flex items-center gap-1"
                        >
                            Recently Created
                            <ChevronDown size={15} />
                        </button>
                    </div>

                </div>


                {/* Search + Filters */}
                <div className="flex flex-col md:flex-row items-center gap-3 justify-between">

                    <div className="relative w-full md:max-w-md">
                        <Search
                            size={19}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search products by name, SKU..."
                            className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low rounded-lg text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:bg-surface focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                    </div>


                    <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">

                        <div className="relative w-full sm:w-52">
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full appearance-none bg-surface-container-low text-text-primary text-sm py-2.5 pl-3.5 pr-10 rounded-lg focus:outline-none focus:bg-surface focus:ring-2 focus:ring-primary/20 cursor-pointer"
                            >
                                <option value="">All Categories</option>
                                {
                                    CATEGORIES.map(category => (
                                        <option key={category.value} value={category.value}>{category.label}</option>
                                    ))
                                }
                            </select>

                            <ChevronDown
                                size={17}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none"
                            />
                        </div>


                        <div className="relative w-full sm:w-44">
                            <select
                                value={stockStatus}
                                onChange={(e) =>
                                    setStockStatus(e.target.value)
                                }
                                className="w-full appearance-none bg-surface-container-low text-text-primary text-sm py-2.5 pl-3.5 pr-10 rounded-lg focus:outline-none focus:bg-surface focus:ring-2 focus:ring-primary/20 cursor-pointer"
                            >
                                <option value="">Stock Status</option>
                                <option value="in_stock">
                                    In Stock
                                </option>
                                <option value="low_stock">
                                    Low Stock
                                </option>
                                <option value="out_stock">
                                    Out of Stock
                                </option>
                            </select>

                            <ChevronDown
                                size={17}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none"
                            />
                        </div>


                        <button
                            type="button"
                            onClick={resetFilters}
                            title="Reset Filters"
                            className="p-2.5 rounded-lg bg-surface-container-low text-text-secondary hover:text-text-primary hover:bg-surface-container transition-colors"
                        >
                            <RefreshCw size={19} />
                        </button>

                    </div>
                </div>
            </div>


            {/* Products Table */}
            <div className="bg-surface rounded-xl shadow-sm overflow-hidden">

                <div className="overflow-x-auto">
                    <table className="w-full text-left">

                        <thead>
                            <tr className="bg-surface-container-low text-text-secondary text-[11px] uppercase tracking-wider">

                                <th className="py-3.5 pl-6 pr-2 w-12">
                                    <input
                                        type="checkbox"
                                        checked={
                                            filteredProducts.length > 0 &&
                                            selectedProducts.length ===
                                            filteredProducts.length
                                        }
                                        onChange={toggleAll}
                                        className="w-4 h-4 accent-primary cursor-pointer"
                                    />
                                </th>

                                <th className="py-3.5 px-2 w-20">
                                    Preview
                                </th>

                                <th className="py-3.5 px-4 min-w-60">
                                    Product Name & SKU
                                </th>

                                <th className="py-3.5 px-4">
                                    Category
                                </th>

                                <th className="py-3.5 px-4 text-right">
                                    Price
                                </th>

                                <th className="py-3.5 px-4">
                                    Stock Level
                                </th>

                                <th className="py-3.5 px-4">
                                    Status
                                </th>

                                <th className="py-3.5 px-4">
                                    Created Date
                                </th>

                                <th className="py-3.5 pl-4 pr-6 text-right">
                                    Actions
                                </th>

                            </tr>
                        </thead>


                        <tbody className="divide-y divide-surface-container-low">

                            {isLoading ? (
                                <tr>
                                    <td colSpan="9">
                                        <Loader />
                                    </td>
                                </tr>
                            ) : isError ? (
                                <tr>
                                    <td colSpan="9" className="py-16 text-center">
                                        <div className="flex flex-col items-center gap-2 text-error">
                                            <Package size={32} />
                                            <p className="text-sm font-medium">
                                                Failed to load products
                                            </p>
                                            <p className="text-xs text-text-secondary">
                                                Please try again later.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredProducts.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="9"
                                        className="py-16 text-center"
                                    >
                                        <div className="flex flex-col items-center gap-2 text-text-secondary">
                                            <Package size={32} />

                                            <p className="text-sm font-medium">
                                                No products found
                                            </p>

                                            <p className="text-xs">
                                                Try changing your filters or search.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredProducts.map((product) => {

                                    const stockPercentage = Math.min(
                                        (product.stock / 75) * 100,
                                        100
                                    );

                                    return (
                                        <tr
                                            key={product._id}
                                            className="hover:bg-surface-container-low/60 transition-colors group"
                                        >

                                            {/* Checkbox */}
                                            <td className="py-4 pl-6 pr-2">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedProducts.includes(product._id)}
                                                    onChange={() => toggleProduct(product._id)}
                                                    className="w-4 h-4 accent-primary cursor-pointer"
                                                />
                                            </td>

                                            {/* Image */}
                                            <td className="py-4 px-2">
                                                <div className="w-14 h-14 rounded-lg bg-surface-container-low overflow-hidden flex items-center justify-center text-primary">

                                                    {product.images?.length > 0 ? (
                                                        <img
                                                            src={product.images[0]}
                                                            alt={product.title}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                    ) : (
                                                        <Package size={22} />
                                                    )}

                                                </div>
                                            </td>

                                            {/* Product */}
                                            <td className="py-4 px-4 min-w-60">
                                                <div className="flex flex-col">

                                                    <span className="text-sm font-semibold text-text-primary group-hover:text-primary transition-colors cursor-pointer">
                                                        {product.title}
                                                    </span>

                                                    <div className="flex items-center gap-2 mt-0.5">
                                                        <span className="text-xs text-text-secondary font-mono">
                                                            {product.sku}
                                                        </span>

                                                        <span className="w-1 h-1 rounded-full bg-surface-container-highest" />
                                                    </div>

                                                </div>
                                            </td>

                                            {/* Category */}
                                            <td className="py-4 px-4">
                                                <span className="inline-flex px-2.5 py-1 rounded-full bg-surface-container-low text-text-secondary text-xs">
                                                    {product.category}
                                                </span>
                                            </td>

                                            {/* Price */}
                                            <td className="py-4 px-4 text-right text-sm font-semibold text-text-primary">
                                                ${product.price.toFixed(2)}
                                            </td>

                                            {/* Stock */}
                                            <td className="py-4 px-4">
                                                <div className="flex flex-col gap-1">

                                                    <div
                                                        className={`flex items-center gap-1.5 text-xs ${product.stock <= 5
                                                                ? product.stock === 0
                                                                    ? "text-error font-semibold"
                                                                    : "text-warning font-semibold"
                                                                : "text-text-primary"
                                                            }`}
                                                    >
                                                        <span
                                                            className={`w-2 h-2 rounded-full ${getStockColor(
                                                                product.stock
                                                            )}`}
                                                        />

                                                        <span>
                                                            {product.stock === 0
                                                                ? "0 out of stock"
                                                                : `${product.stock} in stock`}
                                                        </span>
                                                    </div>

                                                    <div className="w-24 h-1.5 rounded-full bg-surface-container overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full ${getStockColor(
                                                                product.stock
                                                            )}`}
                                                            style={{
                                                                width: `${stockPercentage}%`,
                                                            }}
                                                        />
                                                    </div>

                                                </div>
                                            </td>

                                            {/* Status */}
                                            <td className="py-4 px-4">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyles(
                                                        product.status
                                                    )}`}
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                                    {product.status}
                                                </span>
                                            </td>

                                            {/* Date */}
                                            <td className="py-4 px-4 text-xs text-text-secondary whitespace-nowrap">
                                                {formateDate(product.createdAt)}
                                            </td>

                                            {/* Actions */}
                                            <td className="py-4 pl-4 pr-6">
                                                <button
                                                    onClick={()=>navigate(`/seller/product-detail/${product._id}`)}
                                                    type="button"
                                                    title="View Details"
                                                    className="p-1.5 text-[14px] rounded-lg text-primary hover:bg-accent-light transition-colors cursor-pointer"
                                                >
                                                    View
                                                </button>
                                            </td>

                                        </tr>
                                    );
                                })
                            )}

                        </tbody>
                    </table>
                </div>


                {/* Pagination */}
                <div className="px-6 py-4 bg-surface flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-surface-container-low">

                    <div className="flex items-center gap-3">
                        <span className="text-xs text-text-secondary">
                            Showing{" "}
                            <span className="font-semibold text-text-primary">
                                {filteredProducts.length}
                            </span>{" "}
                            of{" "}
                            <span className="font-semibold text-text-primary">
                                {productsData.length}
                            </span>{" "}
                            products
                        </span>

                        <select className="hidden sm:block bg-surface-container-low text-text-primary text-xs py-1.5 px-2 rounded focus:outline-none cursor-pointer">
                            <option>6 per page</option>
                            <option>12 per page</option>
                            <option>24 per page</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-1">

                        <button
                            type="button"
                            disabled
                            className="p-1.5 rounded-lg text-text-secondary/40 cursor-not-allowed"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        <button
                            type="button"
                            className="w-8 h-8 rounded-lg bg-primary text-white text-xs font-semibold flex items-center justify-center"
                        >
                            1
                        </button>

                        <button
                            type="button"
                            className="w-8 h-8 rounded-lg text-text-primary hover:bg-surface-container-low text-xs flex items-center justify-center"
                        >
                            2
                        </button>

                        <button
                            type="button"
                            className="w-8 h-8 rounded-lg text-text-primary hover:bg-surface-container-low text-xs flex items-center justify-center"
                        >
                            3
                        </button>

                        <span className="px-1 text-text-secondary text-xs">
                            ...
                        </span>

                        <button
                            type="button"
                            className="w-8 h-8 rounded-lg text-text-primary hover:bg-surface-container-low text-xs flex items-center justify-center"
                        >
                            8
                        </button>

                        <button
                            type="button"
                            className="p-1.5 rounded-lg text-text-primary hover:bg-surface-container-low transition-colors"
                        >
                            <ChevronRight size={20} />
                        </button>

                    </div>
                </div>
            </div>


            {/* Bottom Info */}
            <div className="bg-surface rounded-xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">

                <div className="flex items-center gap-3">

                    <div className="w-9 h-9 rounded-lg bg-accent-light flex items-center justify-center text-primary">
                        <Package size={20} />
                    </div>

                    <div>
                        <span className="text-sm font-semibold text-text-primary">
                            Seamless Catalog Synchronization
                        </span>

                        <p className="text-xs text-text-secondary mt-0.5">
                            Changes to pricing and active stock levels
                            automatically propagate to connected sales channels.
                        </p>
                    </div>

                </div>


                <div className="flex items-center gap-2 shrink-0">

                    <button
                        type="button"
                        className="px-4 py-2 rounded-lg bg-surface-container-low text-text-primary hover:bg-surface-container transition-colors text-xs font-medium"
                    >
                        Channel Settings
                    </button>

                    <button
                        type="button"
                        className="px-4 py-2 rounded-lg bg-accent-light text-primary hover:bg-primary hover:text-white transition-colors text-xs font-semibold"
                    >
                        Sync All Channels
                    </button>

                </div>

            </div>

        </div>
    );
};


const StatCard = ({
    label,
    value,
    description,
    icon,
    valueClass = "text-text-primary",
    descriptionClass = "text-text-secondary",
    iconClass = "text-primary bg-accent-light",
}) => {
    return (
        <div className="bg-surface rounded-xl p-4 shadow-sm flex items-center justify-between">

            <div className="flex flex-col">
                <span className="text-[11px] text-text-secondary uppercase tracking-wider font-semibold">
                    {label}
                </span>

                <span className={`text-2xl font-semibold mt-1 ${valueClass}`}>
                    {value}
                </span>

                <span className={`text-xs mt-0.5 ${descriptionClass}`}>
                    {description}
                </span>
            </div>

            <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconClass}`}
            >
                {icon}
            </div>

        </div>
    );
};


export default SellerProducts;