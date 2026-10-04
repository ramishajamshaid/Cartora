import React from "react";
import { AlertTriangle, CheckCircle, X, XCircle } from "lucide-react";

function SellerActionModal({
  isOpen,
  onClose,
  action,
  sellerName,
  reason,
  setReason,
  onConfirm,
  loading,
}) {
  if (!isOpen) return null;

  const isApprove = action === "approve";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                isApprove
                  ? "bg-green-50 text-green-600"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {isApprove ? (
                <CheckCircle size={21} />
              ) : (
                <AlertTriangle size={21} />
              )}
            </div>

            <h2 className="text-lg font-semibold text-text-primary">
              {isApprove ? "Approve Seller" : "Reject Seller"}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-text-secondary hover:bg-gray-100"
          >
            <X size={19} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          <p className="text-sm leading-6 text-text-secondary">
            {isApprove
              ? `Are you sure you want to approve ${
                  sellerName || "this seller"
                }?`
              : `Are you sure you want to reject ${
                  sellerName || "this seller"
                }?`}
          </p>

          {isApprove ? (
            <div className="mt-4 rounded-xl bg-green-50 p-4 text-sm text-green-700">
              Once approved, this seller will be able to use their seller
              account and manage their store.
            </div>
          ) : (
            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium text-text-primary">
                Rejection Reason
              </label>

              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter the reason for rejecting this application..."
                rows={4}
                className="w-full resize-none rounded-xl border border-border px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-border px-6 py-4">
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-text-primary hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading || (!isApprove && !reason.trim())}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50 ${
              isApprove
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {isApprove ? (
              <CheckCircle size={17} />
            ) : (
              <XCircle size={17} />
            )}

            {loading
              ? "Processing..."
              : isApprove
              ? "Approve Seller"
              : "Reject Seller"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SellerActionModal;