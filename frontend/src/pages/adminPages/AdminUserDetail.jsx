import React, { useEffect, useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    BadgeCheck,
    CalendarDays,
    Check,
    ChevronRight,
    Info,
    Laptop,
    LockKeyhole,
    Mail,
    MessageSquare,
    Package,
    PauseCircle,
    Phone,
    PlayCircle,
    Power,
    ReceiptText,
    ShieldCheck,
    ShoppingBag,
    Trash2,
    TrendingUp,
    TriangleAlert,
    User,
    Verified,
    Wallet,
} from "lucide-react";

import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import ConfirmationModal from "../../components/helpers/ConfirmationModal";
import WarningModal from "../../components/helpers/WarningModal";
import api from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { formateDate } from "../../calculations";

const AdminUserDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [isSuspended, setIsSuspended] = useState(false);
    const [modalMode, setModalMode] = useState(null);
    const [isWarningOpen, setIsWarningOpen] = useState(false);
    const [isBtnLoading, setIsBtnLoading] = useState(false)

    const getUserDetail = async () => {
        const { data } = await api.get(`/admin/get-user-detail/${id}`);
        return data?.data;
    };

    
    const {
        data: user,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["user-detail", id],
        queryFn: getUserDetail,
        enabled: !!id,
    });
    
    useEffect(()=>{
        setIsSuspended(user?.accountStatus==="suspended")
    },[user])
    const isAdmin = user?.role === "admin";

    const orders = [
        {
            id: "#ORD-9844",
            date: "May 12, 2024",
            items: "2 items",
            product: "Handmade Clay Vase...",
            total: "$184.00",
            status: "Delivered",
        },
        {
            id: "#ORD-9820",
            date: "Apr 28, 2024",
            items: "1 item",
            product: "Loom Woven Throw",
            total: "$92.50",
            status: "In Transit",
        },
        {
            id: "#ORD-9795",
            date: "Apr 15, 2024",
            items: "4 items",
            product: "Ceramic Coffee Set...",
            total: "$340.00",
            status: "Delivered",
        },
    ];

    const openModal = (mode) => {
        setModalMode(mode);
    };

    const closeModal = () => {
        setModalMode(null);
    };

    const suspendUser = async () => {
        setIsBtnLoading(true)
        try {
            await api.patch(`/admin/suspend-user/${id}`);
            
            setIsSuspended(true);
            setIsBtnLoading(false);
            toast.success("User has been suspended.");
            closeModal();
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to suspend user."
            );
        }
    };

    const unsuspendUser = async () => {
        setIsBtnLoading(true)
        try {
            await api.patch(`/admin/unsuspend-user/${id}`);
            
            setIsSuspended(false);
            setIsBtnLoading(false)
            toast.success("User account has been restored.");
            closeModal();
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to restore user."
            );
        }
    };
    
    const deleteUser = async () => {
        setIsBtnLoading(true)
        try {
            await api.delete(`/admin/delete-user/${id}`);
            
            toast.success("User account deleted.");
            closeModal();
            setIsBtnLoading(false)

            navigate("/admin/users");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to delete user."
            );
        }
    };

    const handleWarning = (message) => {
        console.log("Warning:", {
            userId: user?._id,
            message,
        });

        toast.success(`Warning sent to ${user?.name}.`);
        setIsWarningOpen(false);
    };

    const modalData = {
        suspend: {
            title: isSuspended
                ? `Unsuspend ${user?.fullName}?`
                : `Suspend ${user?.fullName}?`,

            description: isSuspended
                ? "This will restore the user's normal account access and allow them to use the platform again."
                : "This will prevent the user from signing in and using account-related services until the account is restored.",

            confirmText: isSuspended
                ? "Unsuspend User"
                : "Suspend User",
        },

        delete: {
            title: "Delete User Account?",
            description:
                "This action cannot be undone. The user's account will be permanently removed.",
            confirmText: "Delete Account",
        },
    };

    const currentModal = modalData[modalMode];

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    if (isError || !user) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center">
                <p className="text-text-secondary mb-4">
                    Unable to load user details.
                </p>

                <button
                    onClick={() => navigate("/admin/users")}
                    className="text-primary text-sm font-medium hover:underline"
                >
                    Back to Users
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full px-2 py-4">

            {/* ================= TOP BAR ================= */}
            <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div>
                    <div className="mb-2 flex flex-wrap items-center gap-1.5 text-xs font-medium text-text-secondary">
                        <button
                            onClick={() => navigate("/admin/users")}
                            className="flex items-center gap-1 hover:text-primary"
                        >
                            <ArrowLeft size={16} />
                            Back to Users
                        </button>

                        <span>•</span>
                        <span>Users</span>

                        <ChevronRight size={14} />

                        <span className="text-text-primary">
                            {user._id}
                        </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            User Details
                        </h1>

                        <span
                            className={`inline-flex items-center gap-1.5 rounded-full bg-surface px-2.5 py-1 text-xs font-medium shadow-sm ${isSuspended
                                ? "text-error"
                                : "text-success"
                                }`}
                        >
                            <span
                                className={`h-2 w-2 rounded-full ${isSuspended
                                    ? "bg-error"
                                    : "bg-success"
                                    }`}
                            />

                            {isSuspended ? "Suspended" : "Active"}
                        </span>
                    </div>
                </div>

                {/* ================= QUICK ACTIONS ================= */}
                {!isAdmin && (
                    <div className="flex flex-wrap items-center gap-2">

                        <button
                            onClick={() =>
                                toast.success(
                                    `Password reset link sent to ${user.email}`
                                )
                            }
                            className="flex items-center gap-1.5 rounded-lg bg-surface px-3.5 py-2 text-xs font-semibold shadow-sm transition hover:bg-surface-container-low"
                        >
                            <LockKeyhole size={17} />
                            Send Password Reset
                        </button>

                        <button
                            onClick={() => setIsWarningOpen(true)}
                            className="flex items-center gap-1.5 rounded-lg bg-surface px-3.5 py-2 text-xs font-semibold shadow-sm transition hover:bg-surface-container-low"
                        >
                            <TriangleAlert size={17} />
                            Send Warning
                        </button>

                        <button
                            onClick={() => openModal("suspend")}
                            className="flex items-center gap-1.5 rounded-lg bg-accent-light px-3.5 py-2 text-xs font-semibold text-primary transition hover:bg-secondary-fixed"
                        >
                            {isSuspended ? (
                                <PlayCircle size={18} />
                            ) : (
                                <PauseCircle size={18} />
                            )}

                            {isSuspended
                                ? "Unsuspend User"
                                : "Suspend User"}
                        </button>
                    </div>
                )}
            </div>

            {/* ================= MAIN GRID ================= */}
            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">

                {/* ================= LEFT ================= */}
                <div className="flex flex-col gap-6 lg:col-span-8">

                    {/* ================= PROFILE ================= */}
                    <div className="relative overflow-hidden rounded-xl bg-surface p-6 shadow-sm">
                        <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-accent-light/40 blur-2xl" />

                        <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">

                            <div className="flex items-center gap-4">

                                <div className="relative shrink-0">
                                    {user.profile_image ? (
                                        <img
                                            src={user.profile_image}
                                            alt={user.name}
                                            className="h-20 w-20 rounded-full object-cover shadow-sm ring-4 ring-surface"
                                        />
                                    ) : (
                                        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-accent-light text-primary">
                                            <User size={40} />
                                        </span>
                                    )}

                                    <span
                                        className={`absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full ring-2 ring-surface ${isSuspended
                                            ? "bg-error"
                                            : "bg-success"
                                            }`}
                                    >
                                        {isSuspended ? (
                                            <span className="text-[11px] font-bold text-white">
                                                !
                                            </span>
                                        ) : (
                                            <Check
                                                size={12}
                                                className="font-bold text-white"
                                            />
                                        )}
                                    </span>
                                </div>

                                <div className="min-w-0">
                                    <div className="mb-1 flex flex-wrap items-center gap-2">
                                        <h2 className="text-lg font-semibold">
                                            {user.name}
                                        </h2>

                                        <span className="text-sm text-text-secondary">
                                            {user.username}
                                        </span>

                                        <span className="rounded-full bg-surface-container-low px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
                                            {user._id}
                                        </span>
                                    </div>

                                    <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-text-secondary">
                                        <span className="flex items-center gap-1">
                                            <CalendarDays size={15} />
                                            Joined{" "}
                                            {formateDate(user.createdAt)}
                                        </span>

                                        <span>•</span>

                                        <span>
                                            Active {user.active || "N/A"}
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        <a
                                            href={`mailto:${user.email}`}
                                            className="inline-flex items-center gap-1.5 rounded-lg bg-surface-container-low px-3 py-1.5 text-xs font-medium transition hover:bg-accent-light hover:text-primary"
                                        >
                                            <Mail
                                                size={16}
                                                className="text-primary"
                                            />
                                            {user.email}
                                        </a>

                                        <a
                                            href={`tel:${user.phone}`}
                                            className="inline-flex items-center gap-1.5 rounded-lg bg-surface-container-low px-3 py-1.5 text-xs font-medium transition hover:bg-accent-light hover:text-primary"
                                        >
                                            <Phone
                                                size={16}
                                                className="text-primary"
                                            />
                                            {user.phone || "Not Available"}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* ================= ROLE ================= */}
                            <div className="w-full sm:w-auto">
                                <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
                                    Role
                                </span>

                                <span className="inline-flex rounded-lg bg-surface-container-low px-3.5 py-2 text-sm font-medium capitalize">
                                    {user.role}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* ================= METRICS ================= */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                        <div className="rounded-xl bg-surface p-4 shadow-sm">
                            <div className="mb-3 flex items-center justify-between">
                                <span className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
                                    Total Orders
                                </span>

                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-light/70 text-primary">
                                    <ShoppingBag size={18} />
                                </div>
                            </div>

                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold">
                                    18
                                </span>

                                <span className="flex items-center text-xs font-medium text-success">
                                    <TrendingUp size={14} />
                                    +3 this quarter
                                </span>
                            </div>

                            <p className="mt-1 text-xs text-text-secondary">
                                Last order placed 3 days ago
                            </p>
                        </div>

                        <div className="rounded-xl bg-surface p-4 shadow-sm">
                            <div className="mb-3 flex items-center justify-between">
                                <span className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
                                    Total Spent
                                </span>

                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-container-low">
                                    <Wallet size={18} />
                                </div>
                            </div>

                            <span className="text-2xl font-bold">
                                $2,480.50
                            </span>

                            <p className="mt-1 text-xs text-text-secondary">
                                Avg. order value:{" "}
                                <strong className="text-text-primary">
                                    $137.80
                                </strong>
                            </p>
                        </div>

                        <div className="rounded-xl bg-surface p-4 shadow-sm">
                            <div className="mb-3 flex items-center justify-between">
                                <span className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
                                    Last Active
                                </span>

                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-container-low">
                                    <Laptop size={18} />
                                </div>
                            </div>

                            <span className="text-lg font-semibold">
                                2 hours ago
                            </span>

                            <p className="mt-1 truncate text-xs text-text-secondary">
                                Chrome on macOS
                            </p>
                        </div>
                    </div>

                    {/* ================= ACCOUNT DETAILS ================= */}
                    <div className="rounded-xl bg-surface p-6 shadow-sm">
                        <div className="mb-5 flex items-center gap-2">
                            <BadgeCheck
                                size={22}
                                className="text-primary"
                            />

                            <h3 className="text-lg font-semibold">
                                Account Details
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-2">

                            {/* Email */}
                            <div className="flex flex-col gap-1">
                                <span className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
                                    Email Address
                                </span>

                                <div className="flex flex-wrap items-center gap-2 text-sm">
                                    <span className="font-medium">
                                        {user.email}
                                    </span>

                                    <span className="inline-flex items-center gap-1 rounded-full bg-surface-container-low px-2 py-0.5 text-xs text-success">
                                        <Verified size={14} />
                                        Verified
                                    </span>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex flex-col gap-1">
                                <span className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
                                    Primary Phone
                                </span>

                                <div className="flex flex-wrap items-center gap-2 text-sm">
                                    <span className="font-medium">
                                        {user.phone || "Not Available"}
                                    </span>

                                    <span className="inline-flex items-center gap-1 rounded-full bg-surface-container-low px-2 py-0.5 text-xs text-success">
                                        <MessageSquare size={14} />
                                        Verified
                                    </span>
                                </div>
                            </div>

                            {/* Shipping */}
                            <div className="flex flex-col gap-1">
                                <span className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
                                    Shipping Address
                                </span>

                                <span className="text-sm">
                                    {user.shippingAddress ||
                                        "Not Available"}
                                </span>

                                <span className="text-xs text-text-secondary">
                                    {user.location || ""}
                                </span>
                            </div>

                            {/* Billing */}
                            <div className="flex flex-col gap-1">
                                <span className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
                                    Billing Address
                                </span>

                                <div className="flex items-center gap-1.5 text-sm">
                                    <ArrowRight
                                        size={16}
                                        className="rotate-180 text-outline"
                                    />
                                    Same as shipping address
                                </div>
                            </div>

                            {/* Locale */}
                            <div className="flex flex-col gap-1">
                                <span className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
                                    Currency & Locale
                                </span>

                                <span className="text-sm font-medium">
                                    USD ($) • English (US)
                                </span>
                            </div>

                            {/* 2FA */}
                            <div className="flex flex-col gap-1">
                                <span className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
                                    Two-Factor Authentication
                                </span>

                                <div className="flex items-center gap-2 text-sm font-medium text-success">
                                    <ShieldCheck size={16} />
                                    Enabled
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ================= RECENT ORDERS ================= */}
                    <div className="overflow-hidden rounded-xl bg-surface p-6 shadow-sm">
                        <div className="mb-5 flex items-center gap-2">
                            <ReceiptText
                                size={22}
                                className="text-primary"
                            />

                            <h3 className="text-lg font-semibold">
                                Recent Orders
                            </h3>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-162.5 border-collapse text-left">
                                <thead>
                                    <tr className="bg-surface-container-low text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
                                        <th className="px-4 py-3">
                                            Order ID
                                        </th>

                                        <th className="px-4 py-3">
                                            Date
                                        </th>

                                        <th className="px-4 py-3">
                                            Items
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
                                            className="transition hover:bg-surface-container-low/40"
                                        >
                                            <td className="px-4 py-3 font-medium">
                                                <div className="flex items-center gap-1.5">
                                                    <Package
                                                        size={16}
                                                        className="text-outline"
                                                    />
                                                    {order.id}
                                                </div>
                                            </td>

                                            <td className="px-4 py-3 text-text-secondary">
                                                {order.date}
                                            </td>

                                            <td className="px-4 py-3">
                                                <span className="font-medium">
                                                    {order.items}
                                                </span>

                                                <span className="text-xs text-text-secondary">
                                                    {" "}
                                                    ({order.product})
                                                </span>
                                            </td>

                                            <td className="px-4 py-3 font-medium">
                                                {order.total}
                                            </td>

                                            <td className="px-4 py-3">
                                                <span
                                                    className={`inline-flex items-center gap-1 rounded-full bg-surface-container-low px-2.5 py-0.5 text-xs font-medium ${order.status ===
                                                        "Delivered"
                                                        ? "text-success"
                                                        : "text-tertiary"
                                                        }`}
                                                >
                                                    <span
                                                        className={`h-1.5 w-1.5 rounded-full ${order.status ===
                                                            "Delivered"
                                                            ? "bg-success"
                                                            : "bg-tertiary"
                                                            }`}
                                                    />

                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* ================= RIGHT ================= */}
                <div className="flex flex-col gap-6 lg:col-span-4">

                    {/* ================= STATUS ================= */}
                    <div className="flex flex-col gap-4 rounded-xl bg-surface p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">
                                User Status
                            </h3>

                            <span
                                className={`rounded-full bg-surface-container-low px-2.5 py-0.5 text-xs font-medium ${isSuspended
                                    ? "text-error"
                                    : "text-success"
                                    }`}
                            >
                                {isSuspended
                                    ? "Suspended"
                                    : "Active"}
                            </span>
                        </div>

                        <div className="flex items-start gap-2.5 rounded-lg bg-surface-container-low p-3">
                            <Info
                                size={20}
                                className="mt-0.5 shrink-0 text-outline"
                            />

                            <p className="text-xs leading-relaxed text-text-secondary">
                                {isSuspended
                                    ? "This account is currently suspended and cannot access normal account services."
                                    : "This user currently has normal access to the platform."}
                            </p>
                        </div>

                        {/* Admin cannot suspend another admin */}
                        {!isAdmin && (
                            <button
                                onClick={() => openModal("suspend")}
                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent-light px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-secondary-fixed"
                            >
                                {isSuspended ? (
                                    <PlayCircle size={20} />
                                ) : (
                                    <PauseCircle size={20} />
                                )}

                                {isSuspended
                                    ? "Unsuspend User"
                                    : "Suspend User"}
                            </button>
                        )}
                    </div>

                    {/* ================= ADMIN ACTIONS ================= */}
                    {!isAdmin && (
                        <div className="flex flex-col gap-4 rounded-xl bg-surface p-6 shadow-sm">
                            <h3 className="text-lg font-semibold">
                                Admin Actions
                            </h3>

                            <div className="flex flex-col gap-2">

                                {/* Warning */}
                                <button
                                    onClick={() =>
                                        setIsWarningOpen(true)
                                    }
                                    className="group flex w-full items-center justify-between rounded-lg bg-surface-container-low p-3 text-left transition hover:bg-accent-light/50"
                                >
                                    <div className="flex items-center gap-2.5">
                                        <TriangleAlert
                                            size={20}
                                            className="text-outline group-hover:text-primary"
                                        />

                                        <div>
                                            <p className="text-sm font-semibold">
                                                Send Warning
                                            </p>

                                            <p className="text-xs text-text-secondary">
                                                Notify user about an issue
                                            </p>
                                        </div>
                                    </div>

                                    <ChevronRight
                                        size={18}
                                        className="text-outline"
                                    />
                                </button>

                                {/* Password Reset */}
                                <button
                                    onClick={() =>
                                        toast.success(
                                            `Password reset link sent to ${user.email}`
                                        )
                                    }
                                    className="group flex w-full items-center justify-between rounded-lg bg-surface-container-low p-3 text-left transition hover:bg-accent-light/50"
                                >
                                    <div className="flex items-center gap-2.5">
                                        <LockKeyhole
                                            size={20}
                                            className="text-outline group-hover:text-primary"
                                        />

                                        <div>
                                            <p className="text-sm font-semibold">
                                                Send Password Reset
                                            </p>

                                            <p className="text-xs text-text-secondary">
                                                Send a reset link to the user
                                            </p>
                                        </div>
                                    </div>

                                    <ChevronRight
                                        size={18}
                                        className="text-outline"
                                    />
                                </button>

                                {/* Revoke Sessions */}
                                <button
                                    onClick={() =>
                                        toast.success(
                                            "All active user sessions have been revoked."
                                        )
                                    }
                                    className="group flex w-full items-center justify-between rounded-lg bg-surface-container-low p-3 text-left transition hover:bg-accent-light/50"
                                >
                                    <div className="flex items-center gap-2.5">
                                        <Power
                                            size={20}
                                            className="text-outline group-hover:text-primary"
                                        />

                                        <div>
                                            <p className="text-sm font-semibold">
                                                Revoke All Sessions
                                            </p>

                                            <p className="text-xs text-text-secondary">
                                                Sign the user out everywhere
                                            </p>
                                        </div>
                                    </div>

                                    <ChevronRight
                                        size={18}
                                        className="text-outline"
                                    />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ================= DANGER ZONE ================= */}
                    {!isAdmin && (
                        <div className="flex flex-col gap-4 rounded-xl bg-surface p-6 shadow-sm">
                            <div className="flex items-center gap-2 text-error">
                                <TriangleAlert size={20} />

                                <h3 className="text-lg font-semibold">
                                    Danger Zone
                                </h3>
                            </div>

                            <p className="text-xs leading-relaxed text-text-secondary">
                                Permanently remove this user's account.
                                This action cannot be undone.
                            </p>

                            <button
                                onClick={() => openModal("delete")}
                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-error-container px-4 py-2.5 text-sm font-semibold text-on-error-container transition hover:bg-error hover:text-white"
                            >
                                <Trash2 size={20} />
                                Delete User Account
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* ================= CONFIRMATION MODAL ================= */}
            {!isAdmin && modalMode && currentModal && (
                <ConfirmationModal
                    isOpen={true}
                    onClose={closeModal}
                    onConfirm={
                        modalMode === "delete"
                            ? deleteUser
                            : isSuspended
                                ? unsuspendUser
                                : suspendUser
                    }
                    title={currentModal.title}
                    isLoading={isBtnLoading}
                    description={currentModal.description}
                    confirmText={currentModal.confirmText}
                />
            )}

            {/* ================= WARNING MODAL ================= */}
            {!isAdmin && (
                <WarningModal
                    isOpen={isWarningOpen}
                    onClose={() => setIsWarningOpen(false)}
                    onConfirm={handleWarning}
                    name={user.name}
                />
            )}
        </div>
    );
};

export default AdminUserDetail;