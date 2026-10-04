import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Store,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Tag,
  FileText,
  AtSign,
  ShieldCheck,
  CalendarDays,
  CheckCircle,
} from "lucide-react";

import api from "../../api/api";
import InfoItem from "../../components/admin/InfoItem";
import SellerActionModal from "../../components/admin/SellerActionModal"
import ConfirmationModal from "../../components/helpers/ConfirmationModal";
import { QueryClient, useQuery } from "@tanstack/react-query";

const AdminSellerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [actionModal, setActionModal] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [buttonloading, setButtonLoading] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [suspending, setSuspending] = useState(false);

  const getSellerDetail = async () => {
    const { data } = await api.get(`/admin/seller-detail/${id}`);
    return data?.data
  };

  const { data: seller = {}, isLoading, isError } = useQuery({
    queryKey: ["seller-detail"],
    queryFn: getSellerDetail
  })

  const handleSellerAction = async () => {
    setButtonLoading(true)
    try {
      const res = await api.patch(`/seller-application/${id}/${actionModal}`)
      if (res.data.success) {
        console.log(res.data.data);
        await QueryClient.invalidateQueries({
          queryKey: ["seller-detail", id],
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setButtonLoading(false)
      setActionModal(null)
    }
  }

  const handleSuspendSeller = async () => {
    try {
      setSuspending(true);

      const res = await api.delete(`/admin/delete-seller-admin/${id}`);

      if (res.data?.success) {
        setSeller(res.data.data);
        setShowSuspendModal(false);
        navigate('/admin/sellers')
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSuspending(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <p className="text-text-secondary mb-4">Seller not found.</p>

        <button
          onClick={() => navigate("/admin/sellers")}
          className="text-primary text-sm font-medium hover:underline"
        >
          Back to Sellers
        </button>
      </div>
    );
  }

  const data = seller?.seller;
  const user = data?.user || data?.owner;


  return (
    <div className="w-full">
      {/* Back */}
      <button
        onClick={() => navigate("/admin/sellers")}
        className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition mb-6"
      >
        <ArrowLeft size={18} />
        Back to Sellers
      </button>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-border p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-accent-light text-primary flex items-center justify-center">
              {data.storeLogo ? (
                <img
                  src={data?.storeLogo}
                  alt={data?.storeName}
                  className="w-full h-full rounded-xl object-cover"
                />
              ) : (
                <Store size={26} />
              )}
            </div>

            <div>
              <h1 className="text-xl font-semibold text-text-primary">
                {data?.storeName || "Seller"}
              </h1>

              <p className="text-sm text-text-secondary mt-1">
                Seller details
              </p>
            </div>
          </div>

          {/* Status */}
          <span className="px-3 py-1.5 rounded-full bg-accent-light text-primary text-xs font-medium capitalize">
            {data?.status || (user?.role === "seller" ? "approved" : "pending")}
          </span>
        </div>
      </div>

      {/* Store Information */}
      <div className="flex flex-col justify-start items-start gap-4 bg-white rounded-2xl border border-border p-6 mb-6">
        <div className="flex items-center gap-2 mb-5">
          <Store size={19} className="text-primary" />
          <h2 className="font-semibold text-text-primary">
            Store Information
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InfoItem
            icon={<Store size={17} />}
            label="Store Name"
            value={data?.storeName}
          />

          <InfoItem
            icon={<Tag size={17} />}
            label="Category"
            value={data?.storeCategory}
          />

          <InfoItem
            icon={<MapPin size={17} />}
            label="City"
            value={data?.city}
          />

          <InfoItem
            icon={<Phone size={17} />}
            label="Phone"
            value={data?.phone}
          />

          <InfoItem
            icon={<MapPin size={17} />}
            label="Address"
            value={data?.address}
          />

          <InfoItem
            icon={<Calendar size={17} />}
            label="Submitted"
            value={
              data?.createdAt
                ? new Date(data?.createdAt).toLocaleDateString()
                : "-"
            }
          />
        </div>

        {data?.storeDescription && (
          <div className="mt-5">
            <div className="flex items-center gap-2 mb-2">
              <FileText size={17} className="text-primary" />
              <p className="text-sm font-medium">Store Description</p>
            </div>

            <p className="max-w-2xl w-full text-sm text-text-secondary leading-6">
              {data?.storeDescription}
            </p>
          </div>
        )}
      </div>

      {/* User Account Information */}
      {user && typeof user === "object" && (
        <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col gap-5 mb-6">
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User size={20} className="text-primary" />
              <h2 className="text-lg font-semibold text-text-primary">
                User Account Information
              </h2>
            </div>

            <span className="px-2.5 py-1 rounded-full bg-success/10 text-success text-xs font-semibold flex items-center gap-1">
              <CheckCircle size={14} />
              Account Active
            </span>
          </div>

          {/* User Summary */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-surface-container-low rounded-xl">
            {/* Profile Image */}
            <div className="w-16 h-16 rounded-full overflow-hidden bg-accent-light text-primary flex items-center justify-center shrink-0">
              {user?.profile_image ? (
                <img
                  src={user?.profile_image}
                  alt={user?.username || "User profile"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={28} />
              )}
            </div>

            {/* Name + Username */}
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-lg font-semibold text-on-surface truncate">
                  {user?.fullName || "N/A"}
                </span>

                {user?.username && (
                  <span className="text-xs text-text-secondary">
                    @{user?.username}
                  </span>
                )}
              </div>

              <p className="text-sm text-text-secondary mt-0.5">
                Seller Account Owner
              </p>
            </div>

            {/* Contact Actions */}
            <div className="flex items-center gap-2 shrink-0">
              {user?.email && (
                <a
                  href={`mailto:${user?.email}`}
                  className="p-2 rounded-lg bg-white text-on-surface hover:text-primary transition-colors shadow-sm"
                  title="Send Email"
                >
                  <Mail size={17} />
                </a>
              )}

              {user.phone && (
                <a
                  href={`tel:${user?.phone}`}
                  className="p-2 rounded-lg bg-white text-on-surface hover:text-primary transition-colors shadow-sm"
                  title="Call Phone"
                >
                  <Phone size={17} />
                </a>
              )}
            </div>
          </div>

          {/* User Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 pt-1">
            <InfoItem
              icon={<User size={17} />}
              label="Full Name"
              value={user?.fullName}
            />

            <InfoItem
              icon={<AtSign size={17} />}
              label="Username"
              value={user?.username}
            />

            <InfoItem
              icon={<Mail size={17} />}
              label="Email Address"
              value={user?.email}
            />

            {user.phone && (
              <InfoItem
                icon={<Phone size={17} />}
                label="Phone Number"
                value={user?.phone}
              />
            )}

            <InfoItem
              icon={<ShieldCheck size={17} />}
              label="Account Role"
              value={user?.role}
            />

            {user?.createdAt && (
              <InfoItem
                icon={<CalendarDays size={17} />}
                label="Registered Since"
                value={new Date(user?.createdAt).toLocaleDateString()}
              />
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <h2 className="font-semibold text-text-primary mb-4">
          Actions
        </h2>

        <div className="flex flex-wrap gap-3">
          {data?.status ? (
            <>
              {data?.status === "pending" && (
                <>
                  <button
                    onClick={() => setActionModal("approve")}
                    className="px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-container transition"
                  >
                    Accept Seller
                  </button>

                  <button
                    onClick={() => {
                      setRejectReason("");
                      setActionModal("reject");
                    }}
                    className="px-5 py-2.5 rounded-lg border border-error/30 text-error text-sm font-medium hover:bg-error/5 transition"
                  >
                    Reject Seller
                  </button>
                </>
              )}

              {data?.status === "rejected" && (
                <button className="px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-container transition">
                  Reactivate Seller
                </button>
              )}

              {data?.status === "approved" && (
                <button
                  onClick={() => setShowSuspendModal(true)}
                  className="px-5 py-2.5 rounded-lg border border-error/30 text-error text-sm font-medium hover:bg-error/5 transition"
                >
                  Suspend Seller
                </button>
              )}
            </>
          ) : (
            user?.role === "seller" && (
              <button
                onClick={() => setShowSuspendModal(true)}
                className="px-5 py-2.5 rounded-lg border border-error/30 text-error text-sm font-medium hover:bg-error/5 transition"
              >
                Suspend Seller
              </button>
            )
          )}
        </div>
      </div>
      <SellerActionModal
        isOpen={!!actionModal}
        onClose={() => setActionModal(null)}
        action={actionModal}
        sellerName={user?.fullName || seller?.businessName}
        reason={rejectReason}
        setReason={setRejectReason}
        onConfirm={handleSellerAction}
        loading={buttonloading}
      />
      <ConfirmationModal
        isOpen={showSuspendModal}
        onClose={() => setShowSuspendModal(false)}
        onConfirm={handleSuspendSeller}
        title="Suspend Seller?"
        description={`Are you sure you want to suspend ${user?.fullName || "this seller"}? The seller will no longer be able to operate their store until reactivated.`}
        confirmText="Suspend Seller"
        isLoading={suspending}
      />
    </div>
  );
};

export default AdminSellerDetail;