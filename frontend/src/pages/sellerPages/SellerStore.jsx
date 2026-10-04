import React, { useEffect, useState } from "react";
import {
    Store,
    Upload,
    Trash2,
    Copy,
    CheckCircle,
    Phone,
    Mail,
    MapPin,
    Star,
    Package,
    Truck,
    Verified,
    SquarePen,
} from "lucide-react";

import InputField from "../../components/helpers/InputField";
import InfoItem from "../../components/admin/InfoItem";
import { CATEGORIES } from "../../data/categories";
import api from "../../api/api";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner"

const SellerStore = () => {
    const [storeData, setStoreData] = useState({
        storeName: "",
        category: "",
        handle: "",
        description: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        country: "",
        storeLogo: null
    });

    const [logoPreview, setLogoPreview] = useState(null);
    const [isVisible, setIsVisible] = useState(true);
    const [saved, setSaved] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isEditEnable, setIsEditEnable] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false)
    const [errors, setErrors] = useState({
        storeName: "",
        category: "",
        description: "",
        phone: "",
        email: "",
        address: "",
        city: "",
    })

    const updateField = (field, value) => {
        setStoreData((prev) => ({
            ...prev,
            [field]: value,
        }));
        setErrors((prev) => ({
            ...prev,
            [field]: "",
        }));
    };

    const getStoreInfo = async () => {
        const { data } = await api.get("/store/get-my-store")
        console.log(data);

        return data.data
    }

    const { data: store = {}, isLoading, isError } = useQuery({
        queryKey: ["my-store"],
        queryFn: getStoreInfo,
    });

    const setData = (data) => {
        if (data) {
            setStoreData({
                storeName: data.storeName || "",
                storeLogo: data.storeLogo || null,
                handle: "",
                category: data.storeCategory || "",
                description: data.storeDescription || "",
                phone: data.phone || "",
                email: data.owner?.email || "",
                address: data.address || "",
                city: data.city || "",
                country: data.country || "",
            });
            setLogoPreview(data.storeLogo)
        }
    }

    useEffect(() => {
        setData(store)
    }, [store]);

    const handleLogoChange = (e) => {
        const file = e.target.files?.[0];


        if (file) {
            setLogoPreview(URL.createObjectURL(file));
            setStoreData(prev=>({
                ...prev,
                storeLogo: file
            }))
        }
    };

    const removeLogo = () => {
        setLogoPreview(null);
    };

    const copyStoreUrl = async () => {
        if (!storeData.handle) return;

        await navigator.clipboard.writeText(
            `https://cartora.com/store/${storeData.handle}`
        );

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    const validateForm = () => {
        const newErrors = {};

        if (storeData.storeName.trim() === "") {
            newErrors.storeName = "Store name is required";
        }

        if (storeData.category.trim() === "") {
            newErrors.category = "Store category is required";
        }

        if (storeData.description.trim() === "") {
            newErrors.description = "Store description is required";
        }

        if (storeData.phone.trim() === "") {
            newErrors.phone = "Phone number is required";
        }

        if (storeData.email.trim() === "") {
            newErrors.email = "Email is required";
        }

        if (storeData.address.trim() === "") {
            newErrors.address = "Address is required";
        }

        if (storeData.city.trim() === "") {
            newErrors.city = "City is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validateForm()) {
            return;
        }
        setButtonLoading(true)
        const formData = new FormData();

        formData.append("storeName", storeData.storeName);
        formData.append("category", storeData.category);
        formData.append("description", storeData.description);
        formData.append("phone", storeData.phone);
        formData.append("email", storeData.email);
        formData.append("address", storeData.address);
        formData.append("city", storeData.city);

        if (storeData.storeLogo) {
            formData.append("storeLogo", storeData.storeLogo);
        }

        try {            
            const res = await api.patch("/store/update-store-info", formData)
            if (res.data?.success) {
                toast.success("Store Information Updated.")
                setData(res.data?.data)
                setButtonLoading(false)
                setIsEditEnable(false)
                setTimeout(()=>setSaved(true), 3000)
            }
        } catch (error) {
            console.log(error);
            toast.error("Store Information Updation Failed.")
        } finally {
            setButtonLoading(false)
        }
    };

    const handleCancel = () => {
        setIsEditEnable(false)
        setData(store)
    }

    return (
        <div className="w-full px-2 py-4">

            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
                <div>
                    <div className="flex items-center gap-2 text-xs text-text-secondary mb-2">
                        <span>Seller Portal</span>
                        <span>›</span>
                        <span className="text-[#954518] font-medium">
                            Store
                        </span>
                    </div>

                    <h1 className="text-2xl md:text-3xl font-semibold text-[#171717]">
                        Store Management
                    </h1>

                    <p className="text-sm text-text-secondary mt-1">
                        Manage your storefront branding, profile and contact
                        details.
                    </p>
                </div>

                <div className="flex justify-end items-center gap-3">
                    {
                        isEditEnable ?
                            (
                                <>
                                    <button
                                        onClick={handleCancel}
                                        disabled={buttonLoading}
                                        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg ${buttonLoading ? "opacity-80 cursor-not-allowed" : "hover:bg-surface-container-low cursor-pointer"} bg-surface text-text-primary shadow-sm transition-colors text-sm font-medium`}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        disabled={buttonLoading}
                                        className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg ${buttonLoading ? "opacity-80 cursor-not-allowed" : "opacity-100 hover:bg-[#7f3b15] cursor-pointer"} bg-[#954518] text-white text-sm font-medium transition`}
                                    >
                                        {
                                            buttonLoading ?
                                                (<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />) :
                                                <CheckCircle size={18} />
                                        }
                                        Save Changes
                                    </button>
                                </>
                            ) :
                            (
                                <button
                                    onClick={() => setIsEditEnable(true)}
                                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#954518] text-white text-sm font-medium hover:bg-[#7f3b15] transition cursor-pointer"
                                >
                                    <SquarePen size={18} />
                                    Edit
                                </button>
                            )
                    }
                </div>
            </div>

            {/* Success Message */}
            {saved && (
                <div className="flex items-center gap-2 p-4 rounded-xl bg-[#F3E8DF] text-[#954518] text-sm mb-6">
                    <CheckCircle size={18} />
                    Store settings successfully updated.
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Branding */}
                    <section className="bg-white rounded-xl p-5 md:p-6 shadow-sm">
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-[#171717]">
                                Store Branding & Identity
                            </h2>

                            <p className="text-sm text-text-secondary mt-1">
                                Manage your store logo, and basic
                                storefront information.
                            </p>
                        </div>

                        {/* Logo */}
                        <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-[#F6F3F2] mb-6">
                            <div className="w-20 h-20 rounded-xl bg-white overflow-hidden flex items-center justify-center shrink-0">
                                {
                                    logoPreview ? (
                                        <img
                                            src={logoPreview}
                                            alt="Store logo"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <Store
                                            size={28}
                                            className="text-[#954518]"
                                        />
                                    )
                                }
                            </div>

                            <div className="flex-1">
                                <p className="text-sm font-medium text-[#171717]">
                                    Store Logo
                                </p>

                                <p className="text-xs text-text-secondary mt-1">
                                    PNG, JPG or WebP up to 5MB.
                                </p>

                                <div className="flex gap-2 mt-3">
                                    <label className={`${isEditEnable ? "cursor-pointer" : "cursor-not-allowed"} inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white text-xs font-medium text-[#171717] shadow-sm`}>
                                        <Upload size={15} />
                                        Change Logo

                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleLogoChange}
                                            className="hidden"
                                            disabled={!isEditEnable}
                                        />
                                    </label>

                                    {logoPreview && (
                                        <button
                                            type="button"
                                            onClick={removeLogo}
                                            disabled={!isEditEnable}
                                            className={`${isEditEnable ? "cursor-pointer" : "cursor-not-allowed"} inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-red-500 text-xs font-medium hover:bg-red-50`}
                                        >
                                            <Trash2 size={15} />
                                            Remove
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Store Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField
                                label="Store Name"
                                editEnable={isEditEnable}
                                value={storeData.storeName}
                                error={errors.storeName}
                                onChange={(value) =>
                                    updateField("storeName", value)
                                }
                                placeholder="Enter store name"
                                required
                            />

                            <div>
                                <label className="block text-sm font-medium text-[#171717] mb-2">
                                    Store Category
                                </label>

                                <select
                                    value={storeData.category.toLowerCase()}
                                    disabled={!isEditEnable}
                                    onChange={(e) =>
                                        updateField(
                                            "category",
                                            e.target.value
                                        )
                                    }
                                    className="w-full h-11 px-4 rounded-lg bg-[#F6F3F2] border border-transparent focus:bg-white focus:border-[#954518] focus:ring-2 focus:ring-[#954518]/10 outline-none text-sm transition-all"
                                >
                                    <option value="">
                                        Select category
                                    </option>
                                    {
                                        CATEGORIES.map(category => (
                                            <option key={category.value} value={category.value}>
                                                {category.label}
                                            </option>
                                        ))
                                    }
                                </select>
                                {
                                    errors.category ? (
                                        <p className="text-red-500 text-[14px] mt-1">
                                            {errors.category}
                                        </p>
                                    ) : ""
                                }
                            </div>
                        </div>

                        {/* Handle */}
                        <div className="mt-4">
                            <InputField
                                label="Public Storefront Handle"
                                value={storeData.handle}
                                editEnable={isEditEnable}
                                onChange={(value) =>
                                    updateField("handle", value)
                                }
                                placeholder="your-store-name"
                            />

                            <div className="flex items-center justify-between mt-2">
                                <p className="text-xs text-text-secondary truncate">
                                    cartora.com/store/
                                    {storeData.handle || "your-store-name"}
                                </p>

                                <button
                                    type="button"
                                    onClick={copyStoreUrl}
                                    disabled={!storeData.handle}
                                    className="flex items-center gap-1.5 text-xs font-medium text-[#954518] disabled:opacity-50"
                                >
                                    {copied ? (
                                        <CheckCircle size={15} />
                                    ) : (
                                        <Copy size={15} />
                                    )}

                                    {copied ? "Copied" : "Copy URL"}
                                </button>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mt-4">
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-sm font-medium text-[#171717]">
                                    Store Description
                                </label>

                                <span className="text-xs text-text-secondary">
                                    {storeData.description.length}/500
                                </span>
                            </div>

                            <textarea
                                value={storeData.description}
                                maxLength={500}
                                disabled={!isEditEnable}
                                onChange={(e) =>
                                    updateField(
                                        "description",
                                        e.target.value
                                    )
                                }
                                rows={4}
                                placeholder="Describe your store..."
                                className="w-full p-4 rounded-lg bg-[#F6F3F2] border border-transparent focus:bg-white focus:border-[#954518] focus:ring-2 focus:ring-[#954518]/10 outline-none text-sm transition-all resize-none"
                            />
                            {
                                errors.description && (
                                    <p className="text-red-500 text-[14px] mt-1">
                                        {errors.description}
                                    </p>
                                )
                            }
                        </div>
                    </section>

                    {/* Contact */}
                    <section className="bg-white rounded-xl p-5 md:p-6 shadow-sm">
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-[#171717]">
                                Contact & Location
                            </h2>

                            <p className="text-sm text-text-secondary mt-1">
                                Add your store contact and fulfillment
                                location.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField
                                label="Phone Number"
                                value={storeData.phone}
                                editEnable={isEditEnable}
                                error={errors.phone}
                                onChange={(value) =>
                                    updateField("phone", value)
                                }
                                placeholder="+92 300 1234567"
                            />

                            <InputField
                                label="Support Email"
                                editEnable={isEditEnable}
                                emailEnable={false}
                                error={errors.email}
                                value={storeData.email}
                                onChange={(value) =>
                                    updateField("email", value)
                                }
                                placeholder="support@example.com"
                                type="email"
                            />
                        </div>

                        <div className="mt-4">
                            <InputField
                                label="Address"
                                error={errors.address}
                                editEnable={isEditEnable}
                                value={storeData.address}
                                onChange={(value) =>
                                    updateField("address", value)
                                }
                                placeholder="Enter your store address"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            <InputField
                                label="City"
                                error={errors.city}
                                value={storeData.city}
                                editEnable={isEditEnable}
                                onChange={(value) =>
                                    updateField("city", value)
                                }
                                placeholder="City"
                            />

                            <InputField
                                label="Country"
                                editEnable={isEditEnable}
                                value={storeData.country}
                                onChange={(value) =>
                                    updateField("country", value)
                                }
                                placeholder="Country"
                            />
                        </div>
                    </section>
                </div>

                {/* RIGHT */}
                <div className="space-y-6">

                    {/* Status */}
                    <section className="bg-white rounded-xl p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-[#171717]">
                                Store Status
                            </h3>

                            <span
                                className={`px-2.5 py-1 rounded-full text-xs font-semibold ${isVisible
                                    ? "bg-[#F0F7F4] text-success"
                                    : "bg-gray-100 text-gray-500"
                                    }`}
                            >
                                {isVisible ? "Active" : "Offline"}
                            </span>
                        </div>

                        <div className="mt-4 p-4 rounded-xl bg-[#F6F3F2] flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-[#171717]">
                                    Store Visibility
                                </p>

                                <p className="text-xs text-text-secondary mt-1">
                                    {isVisible
                                        ? "Online & accepting orders"
                                        : "Store is currently offline"}
                                </p>
                            </div>

                            <button
                                type="button"
                                disabled={!isEditEnable}
                                onClick={() =>
                                    setIsVisible((prev) => !prev)
                                }
                                className={`relative w-11 h-6 rounded-full transition ${isVisible
                                    ? "bg-[#954518]"
                                    : "bg-gray-300"
                                    }`}
                            >
                                <span
                                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isVisible
                                        ? "left-6"
                                        : "left-1"
                                        }`}
                                />
                            </button>
                        </div>

                        <div className="mt-5 space-y-4">
                            <InfoItem
                                icon={<Verified size={18} />}
                                label="Verification"
                                value="Verified Seller"
                            />

                            <InfoItem
                                icon={<Store size={18} />}
                                label="Store Status"
                                value={
                                    isVisible
                                        ? "Online"
                                        : "Offline"
                                }
                            />
                        </div>
                    </section>

                    {/* Metrics */}
                    <section className="bg-white rounded-xl p-5 shadow-sm">
                        <h3 className="text-lg font-semibold text-[#171717] mb-4">
                            Store Metrics
                        </h3>

                        <div className="space-y-3">
                            <div className="p-3 rounded-lg bg-[#F6F3F2]">
                                <InfoItem
                                    icon={<Star size={18} />}
                                    label="Customer Rating"
                                    value="—"
                                />
                            </div>

                            <div className="p-3 rounded-lg bg-[#F6F3F2]">
                                <InfoItem
                                    icon={<Package size={18} />}
                                    label="Published Products"
                                    value="—"
                                />
                            </div>

                            <div className="p-3 rounded-lg bg-[#F6F3F2]">
                                <InfoItem
                                    icon={<Truck size={18} />}
                                    label="Fulfillment"
                                    value="—"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Contact Preview */}
                    <section className="bg-white rounded-xl p-5 shadow-sm">
                        <h3 className="text-lg font-semibold text-[#171717] mb-4">
                            Store Contact
                        </h3>

                        <div className="space-y-4">
                            <InfoItem
                                icon={<Phone size={18} />}
                                label="Phone"
                                value={storeData.phone}
                            />

                            <InfoItem
                                icon={<Mail size={18} />}
                                label="Email"
                                value={storeData.email}
                            />

                            <InfoItem
                                icon={<MapPin size={18} />}
                                label="Location"
                                value={
                                    [
                                        storeData.city,
                                        storeData.state,
                                        storeData.country,
                                    ]
                                        .filter(Boolean)
                                        .join(", ")
                                }
                            />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default SellerStore;