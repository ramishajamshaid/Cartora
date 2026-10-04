import React, { useMemo, useState } from "react";
import {
    Plus,
    Download,
    Search,
    SlidersHorizontal,
    ChevronLeft,
    ChevronRight,
    Package,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import ProductRow from "../../components/helpers/ProductRow";
import Loader from "../../components/helpers/Loader";
import api from "../../api/api";

function AdminProducts() {
    const [search, setSearch] = useState("");
    const [activeTab, setActiveTab] = useState("all");
    const [selectedProducts, setSelectedProducts] = useState([]);

    const getProducts = async () => {
        const { data } = await api.get("/admin/get-all-products");
        return data.data;
    };

    const {data: products = [], isLoading, isError} = useQuery({
        queryKey: ["admin-products"],
        queryFn: getProducts,
    });

    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Search
        if (search.trim()) {
            const query = search.toLowerCase();

            result = result.filter((product) => {
                return (
                    product.title?.toLowerCase().includes(query) ||
                    product.name?.toLowerCase().includes(query) ||
                    product.sku?.toLowerCase().includes(query) ||
                    product.category?.name
                        ?.toLowerCase()
                        .includes(query) ||
                    product.category
                        ?.toLowerCase()
                        .includes(query)
                );
            });
        }

        // Active
        if (activeTab === "active") {
            result = result.filter(
                (product) => product.status === "active"
            );
        }

        // Low Stock
        if (activeTab === "low-stock") {
            result = result.filter(
                (product) =>
                    product.stock > 0 && product.stock <= 10
            );
        }

        // Draft
        if (activeTab === "draft") {
            result = result.filter(
                (product) => product.status === "draft"
            );
        }

        return result;
    }, [products, search, activeTab]);


    const totalProducts = products.length;

    const inStock = products.filter(
        (product) => product.stock > 0
    ).length;

    const lowStock = products.filter(
        (product) =>
            product.stock > 0 && product.stock <= 10
    ).length;

    const drafts = products.filter(
        (product) => product.status === "draft"
    ).length;

    const toggleProduct = (id) => {
        setSelectedProducts((prev) =>
            prev.includes(id)
                ? prev.filter(
                    (productId) => productId !== id
                )
                : [...prev, id]
        );
    };

    const toggleAll = () => {
        const filteredIds = filteredProducts.map(
            (product) => product._id
        );

        const allSelected =
            filteredIds.length > 0 &&
            filteredIds.every((id) =>
                selectedProducts.includes(id)
            );

        if (allSelected) {
            setSelectedProducts((prev) =>
                prev.filter(
                    (id) => !filteredIds.includes(id)
                )
            );
        } else {
            setSelectedProducts((prev) => [
                ...new Set([...prev, ...filteredIds]),
            ]);
        }
    };

    const allSelected = filteredProducts.length > 0 && filteredProducts.every((product) =>
        selectedProducts.includes(product._id)
    );

    const getStatusStyles = (status) => {
        switch (status) {
            case "active":
                return "bg-success/10 text-success";

            case "draft":
                return "bg-surface-container-low text-text-secondary";

            default:
                return "bg-surface-container-low text-text-secondary";
        }
    };

    const getStockColor = (stock) => {
        if (stock === 0) return "bg-error";
        if (stock <= 10) return "bg-warning";
        return "bg-success";
    };

    return (
        <div className="flex flex-col w-full gap-6 px-2 py-4">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-text-secondary text-xs uppercase tracking-wider font-semibold">
                        <span>Catalog</span>
                        <span>/</span>
                        <span className="text-primary">
                            Inventory
                        </span>
                    </div>

                    <h1 className="font-display text-3xl md:text-4xl font-semibold text-text-primary tracking-tight">
                        Products
                    </h1>

                    <p className="text-sm text-text-secondary">
                        Manage marketplace products and inventory.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-on-primary text-sm font-semibold shadow-sm hover:bg-secondary transition-all"
                    >
                        <Plus size={19} />
                        Add Product
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-surface p-4 rounded-xl shadow-sm">
                    <span className="text-xs text-text-secondary">
                        Total Products
                    </span>

                    <div className="mt-1">
                        <span className="text-2xl font-semibold text-text-primary">
                            {totalProducts}
                        </span>
                    </div>
                </div>

                <div className="bg-surface p-4 rounded-xl shadow-sm">
                    <span className="text-xs text-text-secondary">
                        In Stock
                    </span>

                    <div className="flex items-baseline justify-between mt-1">
                        <span className="text-2xl font-semibold text-text-primary">
                            {inStock}
                        </span>

                        <span className="text-xs text-text-secondary">
                            {totalProducts
                                ? Math.round(
                                    (inStock /
                                        totalProducts) *
                                    100
                                )
                                : 0}
                            %
                        </span>
                    </div>
                </div>

                <div className="bg-surface p-4 rounded-xl shadow-sm">
                    <span className="text-xs text-text-secondary">
                        Low Stock Alerts
                    </span>

                    <div className="flex items-baseline justify-between mt-1">
                        <span className="text-2xl font-semibold text-warning">
                            {lowStock}
                        </span>

                        <span className="px-1.5 py-0.5 rounded text-[11px] font-semibold bg-accent-light text-primary">
                            Needs restock
                        </span>
                    </div>
                </div>

                <div className="bg-surface p-4 rounded-xl shadow-sm">
                    <span className="text-xs text-text-secondary">
                        Draft Products
                    </span>

                    <div className="flex items-baseline justify-between mt-1">
                        <span className="text-2xl font-semibold text-text-secondary">
                            {drafts}
                        </span>

                        <span className="text-xs text-text-secondary">
                            Drafts
                        </span>
                    </div>
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-surface rounded-xl shadow-sm overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                    {/* Search */}
                    <div className="relative flex-1 max-w-xl">
                        <Search
                            size={20}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            placeholder="Search products by name, SKU, or category..."
                            className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-surface-container-low text-text-primary placeholder:text-text-secondary text-sm focus:outline-none focus:bg-surface focus:ring-2 focus:ring-primary/20"
                        />
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                        {/* Tabs */}
                        <div className="flex items-center bg-surface-container-low p-1 rounded-lg">
                            {[
                                [
                                    "all",
                                    `All (${totalProducts})`,
                                ],
                                ["active", "Active"],
                                ["low-stock", "Low Stock"],
                                ["draft", "Draft"],
                            ].map(([value, label]) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() =>
                                        setActiveTab(value)
                                    }
                                    className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${activeTab === value
                                        ? "bg-surface text-primary shadow-sm"
                                        : "text-text-secondary hover:text-text-primary"
                                        }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>

                        <button
                            type="button"
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container-low text-text-primary text-xs font-semibold hover:bg-surface-container transition-colors"
                        >
                            <SlidersHorizontal size={17} />
                            Filters
                        </button>
                    </div>
                </div>

                {/* Table */}
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
                                    <td colSpan="8">
                                        <Loader />
                                    </td>
                                </tr>
                            ) : isError ? (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="py-16 text-center"
                                    >
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
                            ) : filteredProducts.length ===
                                0 ? (
                                <tr>
                                    <td
                                        colSpan="8"
                                        className="py-16 text-center"
                                    >
                                        <div className="flex flex-col items-center gap-2 text-text-secondary">
                                            <Package size={32} />

                                            <p className="text-sm font-medium">
                                                No products found
                                            </p>

                                            <p className="text-xs">
                                                Try changing your
                                                search or filter.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredProducts.map(
                                    (product) => {
                                        const stockPercentage =
                                            Math.min(
                                                (product.stock /
                                                    75) *
                                                100,
                                                100
                                            );

                                        return (
                                            <ProductRow
                                                key={product._id}
                                                product={product}
                                                selectedProducts={
                                                    selectedProducts
                                                }
                                                toggleProduct={
                                                    toggleProduct
                                                }
                                                getStockColor={
                                                    getStockColor
                                                }
                                                getStatusStyles={
                                                    getStatusStyles
                                                }
                                                stockPercentage={
                                                    stockPercentage
                                                }
                                            />
                                        );
                                    }
                                )
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-sm text-text-secondary">
                        Showing{" "}
                        <span className="font-semibold text-text-primary">
                            {filteredProducts.length}
                        </span>{" "}
                        of{" "}
                        <span className="font-semibold text-text-primary">
                            {totalProducts}
                        </span>{" "}
                        products
                    </span>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            disabled
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface text-text-secondary text-xs font-semibold shadow-sm disabled:opacity-40 disabled:pointer-events-none"
                        >
                            <ChevronLeft size={16} />
                            Previous
                        </button>

                        <button
                            type="button"
                            className="w-8 h-8 rounded-lg bg-primary text-on-primary text-xs font-semibold flex items-center justify-center"
                        >
                            1
                        </button>

                        <button
                            type="button"
                            className="w-8 h-8 rounded-lg bg-surface text-text-primary text-xs font-semibold flex items-center justify-center hover:bg-surface-container-low"
                        >
                            2
                        </button>

                        <button
                            type="button"
                            className="w-8 h-8 rounded-lg bg-surface text-text-primary text-xs font-semibold flex items-center justify-center hover:bg-surface-container-low"
                        >
                            3
                        </button>

                        <button
                            type="button"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface text-text-primary text-xs font-semibold shadow-sm hover:bg-surface-container-low"
                        >
                            Next
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminProducts;