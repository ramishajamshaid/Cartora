import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api"
import {
    ArrowLeft,
    Edit3,
    DollarSign,
    Image as ImageIcon,
    UploadCloud,
    Trash2,
    Tag,
    Eye,
    CheckCircle2,
    Send,
    Layers,
    QrCode,
    X,
} from "lucide-react";
import SectionHeader from "../../components/seller/SectionHeader";
import ImageSlot from "../../components/seller/ImageSlot";
import StatusOption from "../../components/seller/StatusOption";
import { CATEGORIES } from "../../data/categories";
import { useQueryClient } from "@tanstack/react-query";
import {toast} from 'sonner'

function SellerAddProduct() {
    const navigate = useNavigate();
    const queryClient = useQueryClient()
    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        comparePrice: "",
        stock: "",
        sku: "",
        category: "",
        subcategory: "",
        brand: "",
        condition: "new",
        status: "draft",
        tags: [],
        images: [],
    });

    const [tagInput, setTagInput] = useState("");
    const [isLoading, setLoading] = useState(false)

    const updateField = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const selectedCategory = CATEGORIES.find(
        (category) => category.value === form.category
    );

    const price = parseFloat(form.price) || 0;
    const comparePrice = parseFloat(form.comparePrice) || 0;
    const stock = parseInt(form.stock) || 0;

    const discount =
        comparePrice > price && price > 0
            ? Math.round(
                ((comparePrice - price) / comparePrice) * 100
            )
            : 0;

    const stockStatus =
        stock <= 0
            ? {
                text: "Out of Stock",
                color: "text-error",
                dot: "bg-error",
            }
            : stock < 10
                ? {
                    text: `Low Stock (${stock})`,
                    color: "text-warning",
                    dot: "bg-warning",
                }
                : {
                    text: "In Stock",
                    color: "text-success",
                    dot: "bg-success",
                };

    const handleAddTag = (e) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();

            const newTag = tagInput.trim();

            if (
                newTag &&
                !form.tags.includes(newTag)
            ) {
                updateField("tags", [
                    ...form.tags,
                    newTag,
                ]);
            }

            setTagInput("");
        }
    };

    const removeTag = (tagToRemove) => {
        updateField(
            "tags",
            form.tags.filter(
                (tag) => tag !== tagToRemove
            )
        );
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files || []);

        if (!files.length) return;

        updateField("images", [
            ...form.images,
            ...files,
        ]);
    };

    const removeImage = (index) => {
        updateField(
            "images",
            form.images.filter(
                (_, imageIndex) =>
                    imageIndex !== index
            )
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        const productData = {
            ...form,
            price: Number(form.price),
            comparePrice: form.comparePrice
                ? Number(form.comparePrice)
                : undefined,
            stock: Number(form.stock),
        };

        const formData = new FormData();

        formData.append("title", form.title);
        formData.append("description", form.description);
        formData.append("price", form.price);
        formData.append("comparePrice", form.comparePrice);
        formData.append("stock", form.stock);
        formData.append("sku", form.sku);
        formData.append("category", form.category);
        formData.append("subcategory", form.subcategory);
        formData.append("brand", form.brand);
        formData.append("condition", form.condition);
        formData.append("status", form.status);

        formData.append("tags", JSON.stringify(form.tags));

        form.images.forEach((image) => {
            formData.append("images", image);
        });

        try {
            const res = await api.post("/product/add-product", formData)
            await queryClient.invalidateQueries({
                queryKey: ["products"],
            });
            navigate("/seller/products")
            toast.success("Product added successfully")
        } catch (error) {
            console.log(error);
            toast.error("Failed to add product")
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="max-w-7xl mx-auto w-full px-2 py-4 space-y-6">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                        <button
                            type="button"
                            onClick={() =>
                                navigate("/seller")
                            }
                            className="hover:text-primary transition-colors"
                        >
                            Seller Portal
                        </button>

                        <span>/</span>

                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    "/seller/products"
                                )
                            }
                            className="hover:text-primary transition-colors"
                        >
                            Products
                        </button>

                        <span>/</span>

                        <span className="text-on-surface font-medium">
                            Add Product
                        </span>
                    </div>

                    <h1 className="text-3xl font-semibold tracking-tight text-on-surface">
                        Add New Product
                    </h1>

                    <p className="text-sm text-text-secondary">
                        Create a new product listing for
                        your Aura Lifestyle Co.
                        storefront.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() =>
                        navigate("/seller/products")
                    }
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-surface shadow-sm text-on-surface text-sm font-medium hover:bg-surface-container-low transition"
                >
                    <ArrowLeft size={18} />
                    Back to Products
                </button>
            </div>

            {/* Main Form */}
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
            >
                {/* LEFT COLUMN */}
                <div className="lg:col-span-8 space-y-6">

                    {/* Basic Information */}
                    <section className="bg-surface rounded-xl p-6 shadow-sm space-y-5">
                        <SectionHeader
                            icon={<Edit3 size={21} />}
                            title="Basic Information"
                            step="Step 1"
                        />

                        {/* Product Name */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-on-surface">
                                Product Name{" "}
                                <span className="text-error">
                                    *
                                </span>
                            </label>

                            <input
                                type="text"
                                value={form.title}
                                onChange={(e) =>
                                    updateField(
                                        "title",
                                        e.target.value
                                    )
                                }
                                placeholder="e.g., Handcrafted Terracotta Planter"
                                required
                                className="w-full px-4 py-2.5 rounded-lg bg-surface-container-lowest text-sm text-on-surface shadow-sm border border-transparent focus:border-primary focus:outline-none transition"
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="block text-sm font-medium text-on-surface">
                                    Description
                                </label>

                                <span className="text-xs text-text-secondary">
                                    {
                                        form.description
                                            .length
                                    }{" "}
                                    / 2000
                                </span>
                            </div>

                            <div className="rounded-lg bg-surface-container-lowest overflow-hidden shadow-sm">
                                <textarea
                                    value={
                                        form.description
                                    }
                                    onChange={(e) =>
                                        updateField(
                                            "description",
                                            e.target.value.slice(
                                                0,
                                                2000
                                            )
                                        )
                                    }
                                    placeholder="Detailed description of the product..."
                                    rows={6}
                                    className="w-full p-4 bg-transparent text-sm text-on-surface focus:outline-none resize-y"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Pricing & Inventory */}
                    <section className="bg-surface rounded-xl p-6 shadow-sm space-y-5">
                        <SectionHeader
                            icon={
                                <DollarSign size={21} />
                            }
                            title="Pricing & Inventory"
                            step="Step 2"
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            {/* Price */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-on-surface">
                                    Price (USD){" "}
                                    <span className="text-error">
                                        *
                                    </span>
                                </label>

                                <div className="relative">
                                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-text-secondary">
                                        $
                                    </span>

                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={form.price}
                                        onChange={(e) =>
                                            updateField(
                                                "price",
                                                e.target
                                                    .value
                                            )
                                        }
                                        required
                                        className="w-full pl-8 pr-4 py-2.5 rounded-lg bg-surface-container-lowest text-sm text-on-surface shadow-sm border border-transparent focus:border-primary focus:outline-none"
                                    />
                                </div>
                            </div>

                            {/* Compare Price */}
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <label className="text-sm font-medium text-on-surface">
                                        Compare-at Price
                                    </label>

                                    <span className="text-xs text-text-secondary">
                                        Optional
                                    </span>
                                </div>

                                <div className="relative">
                                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-text-secondary">
                                        $
                                    </span>

                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={
                                            form.comparePrice
                                        }
                                        onChange={(e) =>
                                            updateField(
                                                "comparePrice",
                                                e.target
                                                    .value
                                            )
                                        }
                                        className="w-full pl-8 pr-4 py-2.5 rounded-lg bg-surface-container-lowest text-sm text-on-surface shadow-sm border border-transparent focus:border-primary focus:outline-none"
                                    />
                                </div>

                                <p className="text-xs text-text-secondary">
                                    Leave blank if not
                                    on sale.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            {/* Stock */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-on-surface">
                                    Stock Quantity{" "}
                                    <span className="text-error">
                                        *
                                    </span>
                                </label>

                                <div className="relative">
                                    <Layers
                                        size={19}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
                                    />

                                    <input
                                        type="number"
                                        min="0"
                                        value={form.stock}
                                        onChange={(e) =>
                                            updateField(
                                                "stock",
                                                e.target
                                                    .value
                                            )
                                        }
                                        required
                                        className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface-container-lowest text-sm text-on-surface shadow-sm border border-transparent focus:border-primary focus:outline-none"
                                    />
                                </div>
                            </div>

                            {/* SKU */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-on-surface">
                                    SKU / Barcode
                                </label>

                                <div className="relative">
                                    <QrCode
                                        size={19}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
                                    />

                                    <input
                                        type="text"
                                        value={form.sku}
                                        onChange={(e) =>
                                            updateField(
                                                "sku",
                                                e.target.value.toUpperCase()
                                            )
                                        }
                                        placeholder="CRT-TX-105"
                                        className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface-container-lowest text-sm text-on-surface shadow-sm border border-transparent focus:border-primary focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Media */}
                    <section className="bg-surface rounded-xl p-6 shadow-sm space-y-5">
                        <SectionHeader
                            icon={
                                <ImageIcon size={21} />
                            }
                            title="Media & Product Images"
                            step="Step 3"
                        />

                        {/* Upload */}
                        <label className="relative rounded-xl bg-surface-container-lowest p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-surface-container-low transition shadow-sm">
                            <input
                                type="file"
                                accept="image/png,image/jpeg,image/webp"
                                multiple
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={
                                    handleImageUpload
                                }
                            />

                            <div className="w-12 h-12 rounded-full bg-accent-light flex items-center justify-center text-primary mb-3">
                                <UploadCloud size={24} />
                            </div>

                            <p className="text-sm font-semibold text-on-surface">
                                Drop product images here,
                                or{" "}
                                <span className="text-primary underline">
                                    browse files
                                </span>
                            </p>

                            <p className="text-xs text-text-secondary max-w-sm mt-1">
                                PNG, JPG, WebP up to
                                5MB. Minimum
                                1000x1000px
                                recommended.
                            </p>
                        </label>

                        {/* Gallery */}
                        <div className="space-y-3">
                            <p className="text-xs text-text-secondary uppercase tracking-wider font-semibold">
                                Image Gallery (
                                {form.images.length}{" "}
                                {form.images.length === 1
                                    ? "image"
                                    : "images"}
                                )
                            </p>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">

                                {form.images.map(
                                    (
                                        image,
                                        index
                                    ) => (
                                        <div
                                            key={index}
                                            className="relative rounded-xl overflow-hidden shadow-sm group bg-surface-container-low aspect-square"
                                        >
                                            <img
                                                src={URL.createObjectURL(image)}
                                                alt={`Product ${index + 1}`}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />

                                            {index ===
                                                0 && (
                                                    <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-primary text-on-primary text-[11px] font-semibold flex items-center gap-1">
                                                        ★ Primary
                                                    </div>
                                                )}

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeImage(
                                                        index
                                                    )
                                                }
                                                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-surface/90 text-error flex items-center justify-center hover:bg-surface"
                                            >
                                                <Trash2
                                                    size={
                                                        15
                                                    }
                                                />
                                            </button>
                                        </div>
                                    )
                                )}

                                {form.images.length <
                                    3 && (
                                        <>
                                            <ImageSlot
                                                title="Add Angle"
                                                subtitle="Detail Shot"
                                            />

                                            {form.images.length <
                                                2 && (
                                                    <ImageSlot
                                                        title="Add Lifestyle"
                                                        subtitle="Context Image"
                                                    />
                                                )}
                                        </>
                                    )}
                            </div>
                        </div>
                    </section>
                </div>

                {/* RIGHT COLUMN */}
                <div className="lg:col-span-4 space-y-6">

                    {/* Organization */}
                    <section className="bg-surface rounded-xl p-6 shadow-sm space-y-5">
                        <div className="flex items-center gap-2">
                            <Tag
                                size={21}
                                className="text-primary"
                            />

                            <h2 className="text-lg font-semibold text-on-surface">
                                Organization
                            </h2>
                        </div>

                        {/* Category */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-on-surface">
                                Category{" "}
                                <span className="text-error">*</span>
                            </label>

                            <select
                                value={form.category}
                                onChange={(e) => {
                                    updateField("category", e.target.value);
                                    updateField("subcategory", "");
                                }}
                                required
                                className="w-full px-4 py-2.5 rounded-lg bg-surface-container-lowest text-sm text-on-surface shadow-sm focus:outline-none focus:border-primary"
                            >
                                <option value="">
                                    Select category
                                </option>

                                {CATEGORIES.map((category) => (
                                    <option
                                        key={category.value}
                                        value={category.value}
                                    >
                                        {category.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Subcategory */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-on-surface">
                                Subcategory
                            </label>

                            <select
                                value={form.subcategory}
                                onChange={(e) =>
                                    updateField(
                                        "subcategory",
                                        e.target.value
                                    )
                                }
                                disabled={!selectedCategory}
                                className="w-full px-4 py-2.5 rounded-lg bg-surface-container-lowest text-sm text-on-surface shadow-sm focus:outline-none focus:border-primary disabled:opacity-50"
                            >
                                <option value="">
                                    Select subcategory
                                </option>

                                {selectedCategory?.subcategories.map(
                                    (subcategory) => (
                                        <option
                                            key={subcategory}
                                            value={subcategory}
                                        >
                                            {subcategory}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>

                        {/* Brand */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-on-surface">
                                Brand
                            </label>

                            <input
                                type="text"
                                value={form.brand}
                                onChange={(e) =>
                                    updateField(
                                        "brand",
                                        e.target.value
                                    )
                                }
                                placeholder="e.g., Aura Lifestyle Co."
                                className="w-full px-4 py-2.5 rounded-lg bg-surface-container-lowest text-sm text-on-surface shadow-sm border border-transparent focus:border-primary focus:outline-none"
                            />
                        </div>

                        {/* Condition */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-on-surface">
                                Condition
                            </label>

                            <select
                                value={
                                    form.condition
                                }
                                onChange={(e) =>
                                    updateField(
                                        "condition",
                                        e.target.value
                                    )
                                }
                                className="w-full px-4 py-2.5 rounded-lg bg-surface-container-lowest text-sm text-on-surface shadow-sm focus:outline-none focus:border-primary"
                            >
                                <option value="new">
                                    New
                                </option>
                                <option value="used">
                                    Used
                                </option>
                                <option value="refurbished">
                                    Refurbished
                                </option>
                            </select>
                        </div>

                        {/* Status */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-on-surface">
                                Product Status
                            </label>

                            <div className="space-y-2">
                                <StatusOption
                                    value="Active"
                                    selected={
                                        form.status ===
                                        "active"
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "status",
                                            value.toLowerCase()
                                        )
                                    }
                                    dot="bg-success"
                                    description="Immediately visible in store catalog"
                                />

                                <StatusOption
                                    value="Draft"
                                    selected={
                                        form.status ===
                                        "draft"
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "status",
                                            value.toLowerCase()
                                        )
                                    }
                                    dot="bg-warning"
                                    description="Saved internally but hidden from customers"
                                />
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-on-surface">
                                Tags
                            </label>

                            <div className="flex flex-wrap gap-1.5 p-2 rounded-lg bg-surface-container-lowest min-h-[46px] items-center shadow-sm">
                                {form.tags.map(
                                    (tag) => (
                                        <span
                                            key={tag}
                                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent-light text-primary text-xs font-semibold"
                                        >
                                            {tag}

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeTag(
                                                        tag
                                                    )
                                                }
                                                className="hover:text-error"
                                            >
                                                <X
                                                    size={
                                                        13
                                                    }
                                                />
                                            </button>
                                        </span>
                                    )
                                )}

                                <input
                                    value={tagInput}
                                    onChange={(e) =>
                                        setTagInput(
                                            e.target.value
                                        )
                                    }
                                    onKeyDown={
                                        handleAddTag
                                    }
                                    placeholder="Add tag..."
                                    className="flex-1 min-w-20 bg-transparent outline-none px-1 text-sm"
                                />
                            </div>

                            <p className="text-xs text-text-secondary">
                                Press comma or enter to
                                create tags
                            </p>
                        </div>
                    </section>

                    {/* Store Preview */}
                    <section className="bg-surface rounded-xl p-6 shadow-sm space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Eye
                                    size={21}
                                    className="text-primary"
                                />

                                <h2 className="text-lg font-semibold text-on-surface">
                                    Store Preview
                                </h2>
                            </div>

                            <span className="text-[10px] uppercase tracking-widest text-text-secondary">
                                Customer View
                            </span>
                        </div>

                        {/* Product Preview */}
                        <div className="rounded-xl overflow-hidden bg-surface-container-low shadow-sm">

                            <div className="relative aspect-square bg-surface-container overflow-hidden">
                                {form.images.length >
                                    0 ? (
                                    <img
                                        src={URL.createObjectURL(form.images[0])}
                                        alt="Product preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-text-secondary">
                                        <ImageIcon
                                            size={40}
                                        />
                                    </div>
                                )}

                                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-surface/90 text-primary text-xs font-semibold">
                                    {form.condition ===
                                        "new"
                                        ? "New"
                                        : form.condition}
                                </span>

                                <span
                                    className={`absolute top-3 right-3 px-2.5 py-1 rounded-full bg-surface/90 ${stockStatus.color} text-xs font-semibold flex items-center gap-1`}
                                >
                                    <span
                                        className={`w-1.5 h-1.5 rounded-full ${stockStatus.dot}`}
                                    />

                                    {
                                        stockStatus.text
                                    }
                                </span>
                            </div>

                            <div className="p-4 space-y-2 bg-surface">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-text-secondary uppercase tracking-wider">
                                        {form.category ||
                                            "Category"}
                                    </span>

                                    <span className="text-xs text-text-secondary">
                                        {form.brand ||
                                            "Your Store"}
                                    </span>
                                </div>

                                <h3 className="text-lg font-semibold text-on-surface truncate">
                                    {form.title ||
                                        "Untitled Product"}
                                </h3>

                                <div className="flex items-baseline gap-2 pt-1">
                                    <span className="text-lg font-bold text-primary">
                                        $
                                        {price.toFixed(
                                            2
                                        )}
                                    </span>

                                    {discount > 0 && (
                                        <>
                                            <span className="text-sm text-text-secondary line-through">
                                                $
                                                {comparePrice.toFixed(
                                                    2
                                                )}
                                            </span>

                                            <span className="text-xs text-error font-medium ml-auto">
                                                Save{" "}
                                                {
                                                    discount
                                                }
                                                %
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Bottom Actions */}
                <div className="lg:col-span-12 sticky bottom-4 z-30">
                    <div className="p-4 rounded-xl bg-surface/95 backdrop-blur-xl shadow-xl flex flex-col gap-4 md:flex-row md:gap-0 items-center justify-between">

                        <div className="flex items-center gap-2 text-text-secondary">
                            <CheckCircle2
                                size={20}
                                className="text-success"
                            />

                            <span className="text-sm">
                                Listing draft updated
                                just now
                            </span>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">

                            <button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        "/seller/products"
                                    )
                                }
                                className="px-4 py-2.5 rounded-lg bg-surface-container-high text-on-surface text-sm font-medium hover:bg-surface-container-highest transition"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    updateField(
                                        "status",
                                        "draft"
                                    );

                                    console.log(
                                        "Save as Draft",
                                        {
                                            ...form,
                                            status: "draft",
                                        }
                                    );
                                }}
                                className="px-4 py-2.5 rounded-lg bg-surface text-on-surface text-sm font-medium shadow-sm shrink-0 hover:bg-surface-container-low transition"
                            >
                                Save as Draft
                            </button>

                            <button
                                type="submit"
                                className="w-64 flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-on-primary text-sm font-semibold shadow-md hover:bg-primary-container transition"
                            >
                                {
                                    isLoading ?
                                        (<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />) :
                                        (
                                            <>
                                                <Send size={18} />
                                                "Save & Publish Product"
                                            </>
                                        )
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SellerAddProduct;