import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    Edit3,
    Save,
    X,
    Trash2,
    Image as ImageIcon,
    CreditCard,
    Eye,
    BarChart3,
    CheckCircle2,
    AlertCircle,
    Plus,
    Tag,
    Store,
    TrendingUp,
    User,
    ShieldCheck,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import api from "../../api/api";
import InputField from "../../components/helpers/InputField";
import ConfirmationModal from "../../components/helpers/ConfirmationModal";

const AdminProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState(null);
    const [originalData, setOriginalData] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [newImages, setNewImages] = useState([]);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const {
        data: product,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["admin-product", id],

        queryFn: async () => {
            const res = await api.get(`/product/get-product-detail-admin/${id}`);

            return res.data?.data || res.data;
        },

        enabled: !!id,
    });
    

    const setData = (product) => {
        if (!product) return;

        const productData = {
            title: product.title || "",
            description: product.description || "",
            price: product.price || "",
            comparePrice: product.comparePrice || "",
            stock: product.stock || "",
            sku: product.sku || "",
            category: product.category || "",
            subcategory: product.subcategory || "",
            brand: product.brand || "",
            condition: product.condition || "",
            status: product.status || "active",
            tags: product.tags || [],
            images: product.images || [],

            // Seller / Store information
            store: product.store || null,
        };

        setFormData(productData);
        setOriginalData(productData);
    };

    useEffect(() => {
        setData(product);
    }, [product]);

    const updateField = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files || []);

        if (!files.length) return;

        const currentCount =
            (formData.images?.length || 0) + newImages.length;

        const remainingSlots = 5 - currentCount;

        if (remainingSlots <= 0) {
            toast.error("Maximum 5 images allowed");
            e.target.value = "";
            return;
        }

        const selectedFiles = files.slice(0, remainingSlots);

        if (files.length > remainingSlots) {
            toast.error(
                `You can only add ${remainingSlots} more image${
                    remainingSlots > 1 ? "s" : ""
                }`
            );
        }

        const imageFiles = selectedFiles.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        setNewImages((prev) => [...prev, ...imageFiles]);

        e.target.value = "";
    };

    const removeExistingImage = (index) => {
        if (!editMode) return;

        updateField(
            "images",
            formData.images.filter((_, i) => i !== index)
        );
    };

    const removeNewImage = (index) => {
        setNewImages((prev) => {
            const image = prev[index];

            if (image?.preview) {
                URL.revokeObjectURL(image.preview);
            }

            return prev.filter((_, i) => i !== index);
        });
    };

    const handleCancel = () => {
        newImages.forEach((image) => {
            if (image.preview) {
                URL.revokeObjectURL(image.preview);
            }
        });

        setNewImages([]);
        setFormData(originalData);
        setEditMode(false);
    };

    const handleSave = async () => {
        try {
            setIsSaving(true);

            const data = new FormData();

            data.append("title", formData.title);
            data.append("description", formData.description);
            data.append("price", formData.price);
            data.append("comparePrice", formData.comparePrice);
            data.append("stock", formData.stock);
            data.append("sku", formData.sku);
            data.append("category", formData.category);
            data.append("subcategory", formData.subcategory);
            data.append("brand", formData.brand);
            data.append("condition", formData.condition);
            data.append("status", formData.status);

            formData.tags.forEach((tag) => {
                data.append("tags", tag);
            });

            formData.images.forEach((image) => {
                const imageUrl =
                    typeof image === "string"
                        ? image
                        : image?.url;

                if (imageUrl) {
                    data.append("existingImages", imageUrl);
                }
            });

            newImages.forEach(({ file }) => {
                data.append("images", file);
            });

            const res = await api.patch(
                `/product/update-product-detail-admin/${id}`,
                data
            );

            if (res.data?.success) {
                const updatedProduct = res.data.data;

                setData(updatedProduct);

                newImages.forEach((image) => {
                    if (image.preview) {
                        URL.revokeObjectURL(image.preview);
                    }
                });

                setNewImages([]);
                setEditMode(false);

                toast.success("Product updated successfully");
            }
        } catch (error) {
            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                    "Failed to update product"
            );
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteProduct = async () => {
        try {
            setIsDeleting(true);

            const res = await api.delete(
                `/product/delete-product-admin/${id}`
            );

            if (res.data?.success) {
                toast.success("Product deleted successfully");

                setShowDeleteModal(false);

                navigate("/admin/products");
            }
        } catch (error) {
            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                    "Failed to delete product"
            );
        } finally {
            setIsDeleting(false);
        }
    };

    const removeTag = (tag) => {
        if (!editMode) return;

        updateField(
            "tags",
            formData.tags.filter((item) => item !== tag)
        );
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-9 h-9 border-4 border-[#F3E8DF] border-t-[#954518] rounded-full animate-spin" />

                    <p className="text-sm text-text-secondary">
                        Loading Product...
                    </p>
                </div>
            </div>
        );
    }

    if (isError || !formData) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <AlertCircle
                        className="mx-auto text-red-500 mb-3"
                        size={36}
                    />

                    <h2 className="text-lg font-semibold text-[#171717]">
                        Product not found
                    </h2>

                    <button
                        onClick={() => navigate(-1)}
                        className="mt-4 text-sm text-[#954518] font-medium hover:underline"
                    >
                        Go back
                    </button>
                </div>
            </div>
        );
    }

    const sellerName =
        formData.seller?.username ||
        formData.seller?.name ||
        "Unknown Seller";

    const sellerEmail = formData.seller?.email || "N/A";

    const storeName =formData.store?.storeName || "Unknown Store";

    return (
        <div className="w-full px-2 py-4">

            {/* Top Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-7">

                <div className="flex items-center gap-2 text-sm text-text-secondary">

                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-1.5 hover:text-[#954518] transition-colors"
                    >
                        <ArrowLeft size={17} />
                        Products
                    </button>

                    <span>/</span>

                    <span className="text-[#171717] font-medium truncate max-w-62.5">
                        {formData.title}
                    </span>
                </div>

                <div className="flex items-center gap-2">

                    {!editMode ? (
                        <button
                            onClick={() => setEditMode(true)}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#954518] text-white text-sm font-semibold hover:bg-[#793003] transition-all"
                        >
                            <Edit3 size={17} />
                            Edit Product
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={handleCancel}
                                disabled={isSaving}
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-border text-[#171717] text-sm font-medium hover:bg-[#F6F3F2] transition-all"
                            >
                                <X size={17} />
                                Cancel
                            </button>

                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#954518] text-white text-sm font-semibold hover:bg-[#793003] disabled:opacity-60 transition-all"
                            >
                                <Save size={17} />

                                {isSaving
                                    ? "Saving..."
                                    : "Save Changes"}
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-8">

                <div>

                    <div className="flex items-center gap-2 mb-2">

                        <span className="px-2.5 py-1 rounded-full bg-[#F3E8DF] text-[#964826] text-xs font-semibold">
                            {formData.category || "Product"}
                        </span>

                        <span className="text-xs text-text-secondary">
                            SKU: {formData.sku || "N/A"}
                        </span>

                    </div>

                    <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-[#171717]">
                        {formData.title}
                    </h1>

                    <p className="mt-2 text-sm text-text-secondary max-w-2xl">
                        Manage product information, inventory, storefront
                        visibility and seller listing from the admin panel.
                    </p>
                </div>

                {/* Admin Status */}
                <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-border">

                    <span
                        className={`w-3 h-3 rounded-full ${
                            formData.status === "active"
                                ? "bg-success"
                                : formData.status === "draft"
                                ? "bg-warning"
                                : "bg-text-secondary"
                        }`}
                    />

                    <div>
                        <p className="text-[11px] uppercase tracking-wider text-text-secondary font-semibold">
                            Admin Product Status
                        </p>

                        <p className="text-sm font-semibold text-[#171717] capitalize">
                            {formData.status}
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 mb-8">

                {/* Main Column */}
                <div className="lg:col-span-8 flex flex-col gap-7">

                    {/* Basic Information */}
                    <section className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-border/70">

                        <div className="flex items-center gap-3 mb-7">

                            <div className="w-10 h-10 rounded-lg bg-[#F0EDEB] flex items-center justify-center text-[#954518]">
                                <Edit3 size={21} />
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold text-[#171717]">
                                    Basic Information
                                </h2>

                                <p className="text-xs text-text-secondary">
                                    Product details and classification
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            <div className="md:col-span-2">
                                <InputField
                                    label="Product Name"
                                    required
                                    value={formData.title}
                                    onChange={(value) =>
                                        updateField("title", value)
                                    }
                                    editEnable={editMode}
                                />
                            </div>

                            <InputField
                                label="Brand"
                                value={formData.brand}
                                onChange={(value) =>
                                    updateField("brand", value)
                                }
                                editEnable={editMode}
                            />

                            <InputField
                                label="Condition"
                                value={formData.condition}
                                onChange={(value) =>
                                    updateField("condition", value)
                                }
                                editEnable={editMode}
                            />

                            <InputField
                                label="Category"
                                value={formData.category}
                                onChange={(value) =>
                                    updateField("category", value)
                                }
                                editEnable={editMode}
                            />

                            <InputField
                                label="Subcategory"
                                value={formData.subcategory}
                                onChange={(value) =>
                                    updateField("subcategory", value)
                                }
                                editEnable={editMode}
                            />

                            <div className="md:col-span-2">

                                <label className="block text-sm font-medium text-[#171717] mb-2">
                                    Description
                                </label>

                                <textarea
                                    value={formData.description}
                                    onChange={(e) =>
                                        updateField(
                                            "description",
                                            e.target.value
                                        )
                                    }
                                    disabled={!editMode}
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-lg bg-[#F6F3F2] border border-transparent focus:bg-white focus:border-[#954518] focus:ring-2 focus:ring-[#954518]/10 outline-none text-sm transition-all resize-y disabled:cursor-default disabled:text-[#555]"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Pricing & Inventory */}
                    <section className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-border/70">

                        <div className="flex items-center gap-3 mb-7">

                            <div className="w-10 h-10 rounded-lg bg-[#F0EDEB] flex items-center justify-center text-[#954518]">
                                <CreditCard size={21} />
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold text-[#171717]">
                                    Pricing & Inventory
                                </h2>

                                <p className="text-xs text-text-secondary">
                                    Manage product pricing and stock
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            <InputField
                                label="Retail Price"
                                required
                                type="number"
                                value={formData.price}
                                onChange={(value) =>
                                    updateField("price", value)
                                }
                                editEnable={editMode}
                            />

                            <InputField
                                label="Compare-at Price"
                                type="number"
                                value={formData.comparePrice}
                                onChange={(value) =>
                                    updateField(
                                        "comparePrice",
                                        value
                                    )
                                }
                                editEnable={editMode}
                            />

                            <InputField
                                label="Stock Quantity"
                                required
                                type="number"
                                value={formData.stock}
                                onChange={(value) =>
                                    updateField("stock", value)
                                }
                                editEnable={editMode}
                            />

                            <InputField
                                label="SKU / Item Identifier"
                                value={formData.sku}
                                editEnable={false}
                            />
                        </div>

                        <div className="mt-6 p-4 rounded-xl bg-[#F6F3F2] flex items-center justify-between gap-4">

                            <div className="flex items-center gap-3">

                                <div
                                    className={`w-9 h-9 rounded-full flex items-center justify-center ${
                                        Number(formData.stock) > 0
                                            ? "bg-success/10 text-success"
                                            : "bg-red-100 text-red-500"
                                    }`}
                                >
                                    {Number(formData.stock) > 0 ? (
                                        <CheckCircle2 size={19} />
                                    ) : (
                                        <AlertCircle size={19} />
                                    )}
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-[#171717]">
                                        Stock Availability
                                    </p>

                                    <p className="text-xs text-text-secondary">
                                        {Number(formData.stock) > 0
                                            ? "Product is currently available"
                                            : "Product is out of stock"}
                                    </p>
                                </div>
                            </div>

                            <span
                                className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                                    Number(formData.stock) > 0
                                        ? "bg-success/10 text-success"
                                        : "bg-red-100 text-red-500"
                                }`}
                            >
                                {Number(formData.stock) > 0
                                    ? "In Stock"
                                    : "Out of Stock"}
                            </span>
                        </div>
                    </section>

                    {/* Gallery */}
                    <section className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-border/70">

                        <div className="flex items-center justify-between mb-7">

                            <div className="flex items-center gap-3">

                                <div className="w-10 h-10 rounded-lg bg-[#F0EDEB] flex items-center justify-center text-[#954518]">
                                    <ImageIcon size={21} />
                                </div>

                                <div>
                                    <h2 className="text-lg font-semibold text-[#171717]">
                                        Product Gallery
                                    </h2>

                                    <p className="text-xs text-text-secondary">
                                        Manage product images
                                    </p>
                                </div>
                            </div>

                            <span className="text-xs text-text-secondary">
                                {(formData.images?.length || 0) +
                                    newImages.length}{" "}
                                images
                            </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

                            {formData.images?.map((image, index) => {

                                const imageUrl =
                                    typeof image === "string"
                                        ? image
                                        : image?.url;

                                return (
                                    <div
                                        key={`existing-${index}`}
                                        className="group relative aspect-square rounded-xl overflow-hidden bg-[#F6F3F2]"
                                    >
                                        <img
                                            src={imageUrl}
                                            alt={`${formData.title} ${
                                                index + 1
                                            }`}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />

                                        {index === 0 && (
                                            <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-semibold text-[#171717]">
                                                Cover
                                            </span>
                                        )}

                                        {editMode && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeExistingImage(
                                                        index
                                                    )
                                                }
                                                className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white text-red-500 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        )}
                                    </div>
                                );
                            })}

                            {newImages.map((image, index) => (
                                <div
                                    key={`new-${index}`}
                                    className="group relative aspect-square rounded-xl overflow-hidden bg-[#F6F3F2]"
                                >
                                    <img
                                        src={image.preview}
                                        alt={`New product ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />

                                    <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-[#954518] text-white text-[11px] font-semibold">
                                        New
                                    </span>

                                    {editMode && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeNewImage(index)
                                            }
                                            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white text-red-500 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    )}
                                </div>
                            ))}

                            {editMode &&
                                (formData.images?.length || 0) +
                                    newImages.length <
                                    5 && (
                                    <label
                                        htmlFor="admin-product-images"
                                        className="aspect-square rounded-xl border-2 border-dashed border-[#DBC1B7] bg-[#F6F3F2] hover:bg-[#F3E8DF] flex flex-col items-center justify-center gap-2 text-[#954518] transition-all cursor-pointer"
                                    >
                                        <Plus size={25} />

                                        <span className="text-xs font-semibold">
                                            Add Image
                                        </span>

                                        <input
                                            id="admin-product-images"
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </label>
                                )}
                        </div>

                        {!formData.images?.length &&
                            !newImages.length && (
                                <div className="h-52 rounded-xl bg-[#F6F3F2] flex flex-col items-center justify-center text-text-secondary">
                                    <ImageIcon size={35} />

                                    <p className="text-sm mt-2">
                                        No product images
                                    </p>
                                </div>
                            )}
                    </section>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-4 flex flex-col gap-7">

                    {/* Seller / Store */}
                    <section className="bg-white rounded-xl p-6 shadow-sm border border-border/70">

                        <div className="flex items-center gap-3 mb-6">

                            <div className="w-9 h-9 rounded-lg bg-[#F0EDEB] flex items-center justify-center text-[#954518]">
                                <Store size={19} />
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold text-[#171717]">
                                    Seller & Store
                                </h2>

                                <p className="text-xs text-text-secondary">
                                    Product ownership information
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">

                            <div className="flex items-center gap-3">

                                <div className="w-10 h-10 rounded-full bg-[#F3E8DF] flex items-center justify-center text-[#954518]">
                                    <User size={18} />
                                </div>

                                <div className="min-w-0">
                                    <p className="text-xs text-text-secondary">
                                        Seller
                                    </p>

                                    <p className="text-sm font-semibold text-[#171717] truncate">
                                        {sellerName}
                                    </p>

                                    <p className="text-xs text-text-secondary truncate">
                                        {sellerEmail}
                                    </p>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-border/70">

                                <p className="text-xs text-text-secondary">
                                    Store
                                </p>

                                <p className="text-sm font-semibold text-[#171717] mt-1">
                                    {storeName}
                                </p>
                            </div>

                            {formData.seller?.role && (
                                <div className="flex items-center gap-2">

                                    <ShieldCheck
                                        size={15}
                                        className="text-success"
                                    />

                                    <span className="text-xs text-text-secondary">
                                        Role:{" "}
                                        <span className="font-semibold text-[#171717] capitalize">
                                            {formData.seller.role}
                                        </span>
                                    </span>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Status */}
                    <section className="bg-white rounded-xl p-6 shadow-sm border border-border/70">

                        <div className="flex items-center gap-3 mb-6">

                            <div className="w-9 h-9 rounded-lg bg-[#F0EDEB] flex items-center justify-center text-[#954518]">
                                <Eye size={19} />
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold text-[#171717]">
                                    Storefront Control
                                </h2>

                                <p className="text-xs text-text-secondary">
                                    Admin visibility controls
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">

                            {[
                                {
                                    value: "active",
                                    title: "Active",
                                    description:
                                        "Visible and shoppable",
                                    color: "bg-success",
                                },
                                {
                                    value: "draft",
                                    title: "Draft",
                                    description:
                                        "Hidden from customers",
                                    color: "bg-[#C58A28]",
                                },
                                {
                                    value: "archived",
                                    title: "Archived",
                                    description:
                                        "Removed from storefront",
                                    color: "bg-[#737373]",
                                },
                            ].map((status) => (
                                <label
                                    key={status.value}
                                    className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                                        editMode
                                            ? "cursor-pointer hover:bg-[#F6F3F2]"
                                            : "cursor-default"
                                    }`}
                                >
                                    <div className="flex items-center gap-3">

                                        <input
                                            type="radio"
                                            name="admin_product_status"
                                            value={status.value}
                                            checked={
                                                formData.status ===
                                                status.value
                                            }
                                            onChange={(e) =>
                                                updateField(
                                                    "status",
                                                    e.target.value
                                                )
                                            }
                                            disabled={!editMode}
                                            className="w-4 h-4 accent-[#954518]"
                                        />

                                        <div>
                                            <p className="text-sm font-semibold text-[#171717]">
                                                {status.title}
                                            </p>

                                            <p className="text-xs text-text-secondary">
                                                {status.description}
                                            </p>
                                        </div>
                                    </div>

                                    <span
                                        className={`w-2.5 h-2.5 rounded-full ${status.color}`}
                                    />
                                </label>
                            ))}
                        </div>
                    </section>

                    {/* Tags */}
                    <section className="bg-white rounded-xl p-6 shadow-sm border border-border/70">

                        <div className="flex items-center justify-between mb-5">

                            <div className="flex items-center gap-3">

                                <div className="w-9 h-9 rounded-lg bg-[#F0EDEB] flex items-center justify-center text-[#954518]">
                                    <Tag size={18} />
                                </div>

                                <div>
                                    <h2 className="text-lg font-semibold text-[#171717]">
                                        Product Tags
                                    </h2>

                                    <p className="text-xs text-text-secondary">
                                        Search and taxonomy tags
                                    </p>
                                </div>
                            </div>

                            {editMode && (
                                <button
                                    type="button"
                                    className="text-xs font-semibold text-[#954518] hover:underline"
                                    onClick={() => {
                                        const tag =
                                            window.prompt("Enter tag");

                                        if (
                                            tag &&
                                            !formData.tags.includes(
                                                tag
                                            )
                                        ) {
                                            updateField("tags", [
                                                ...formData.tags,
                                                tag,
                                            ]);
                                        }
                                    }}
                                >
                                    + Add Tag
                                </button>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-2">

                            {formData.tags?.length > 0 ? (
                                formData.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F3E8DF] text-[#964826] text-xs font-semibold"
                                    >
                                        {tag}

                                        {editMode && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeTag(tag)
                                                }
                                                className="hover:text-red-500"
                                            >
                                                <X size={13} />
                                            </button>
                                        )}
                                    </span>
                                ))
                            ) : (
                                <p className="text-sm text-text-secondary">
                                    No tags added
                                </p>
                            )}
                        </div>
                    </section>

                    {/* Performance */}
                    <section className="bg-white rounded-xl p-6 shadow-sm border border-border/70">

                        <div className="flex items-center justify-between mb-5">

                            <div className="flex items-center gap-3">

                                <div className="w-9 h-9 rounded-lg bg-[#F0EDEB] flex items-center justify-center text-[#954518]">
                                    <BarChart3 size={19} />
                                </div>

                                <div>
                                    <h2 className="text-lg font-semibold text-[#171717]">
                                        Performance
                                    </h2>

                                    <p className="text-xs text-text-secondary">
                                        Product metrics
                                    </p>
                                </div>
                            </div>

                            <TrendingUp
                                size={18}
                                className="text-success"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">

                            <div className="p-4 rounded-xl bg-[#F6F3F2]">

                                <p className="text-[11px] uppercase tracking-wide text-text-secondary font-semibold">
                                    Total Sold
                                </p>

                                <p className="text-2xl font-bold text-[#171717] mt-1">
                                    {product.totalSold || 0}
                                </p>

                                <p className="text-xs text-success mt-1">
                                    units shipped
                                </p>
                            </div>

                            <div className="p-4 rounded-xl bg-[#F6F3F2]">

                                <p className="text-[11px] uppercase tracking-wide text-text-secondary font-semibold">
                                    Revenue
                                </p>

                                <p className="text-2xl font-bold text-[#171717] mt-1">
                                    $
                                    {Number(
                                        product.revenue || 0
                                    ).toLocaleString()}
                                </p>

                                <p className="text-xs text-text-secondary mt-1">
                                    lifetime
                                </p>
                            </div>
                        </div>

                        <div className="mt-3 p-4 rounded-xl bg-[#F6F3F2]">

                            <div className="flex items-center justify-between">

                                <span className="text-xs text-text-secondary">
                                    Current Inventory
                                </span>

                                <span className="text-sm font-semibold text-[#171717]">
                                    {formData.stock} units
                                </span>
                            </div>

                            <div className="mt-3 h-2 rounded-full bg-[#E5E2E1] overflow-hidden">

                                <div
                                    className="h-full bg-[#954518] rounded-full"
                                    style={{
                                        width: `${Math.min(
                                            Number(
                                                formData.stock
                                            ) || 0,
                                            100
                                        )}%`,
                                    }}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Admin Notice */}
                    <section className="rounded-xl bg-[#F3E8DF] p-5">

                        <div className="flex items-center gap-2 text-[#964826] mb-2">
                            <ShieldCheck size={18} />

                            <span className="text-sm font-semibold">
                                Admin Controls
                            </span>
                        </div>

                        <p className="text-xs text-[#55433B] leading-relaxed">
                            As an administrator, you can modify product
                            information, control storefront visibility and
                            remove listings that violate marketplace rules
                            or platform requirements.
                        </p>
                    </section>
                </div>
            </div>

            {/* Danger Zone */}
            <section className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-red-100">

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">

                    <div>

                        <div className="flex items-center gap-3 mb-2">

                            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-500">
                                <Trash2 size={20} />
                            </div>

                            <h2 className="text-lg font-semibold text-[#171717]">
                                Delete Product
                            </h2>
                        </div>

                        <p className="text-sm text-text-secondary max-w-xl">
                            Permanently remove this product from the
                            marketplace. This action cannot be undone.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            setShowDeleteModal(true)
                        }
                        disabled={isDeleting}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-red-200 bg-red-50 text-red-600 text-sm font-semibold hover:bg-red-100 transition-colors disabled:opacity-50"
                    >
                        <Trash2 size={17} />
                        Delete Product
                    </button>
                </div>
            </section>

            {/* Reusable Confirmation Modal */}
            <ConfirmationModal
                isOpen={showDeleteModal}
                onClose={() =>
                    setShowDeleteModal(false)
                }
                onConfirm={handleDeleteProduct}
                title="Delete Product?"
                description={`Are you sure you want to delete "${formData.title}"? This product and its information will be permanently removed from the marketplace. This action cannot be undone.`}
                confirmText="Delete Product"
                isLoading={isDeleting}
            />
        </div>
    );
};

export default AdminProductDetail;