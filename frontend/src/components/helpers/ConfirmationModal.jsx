import React from "react";
import { AlertTriangle, X } from "lucide-react";
import Loader from "./Loader";

const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Are you sure?",
    description = "This action cannot be undone.",
    confirmText = "Delete",
    cancelText = "Cancel",
    isLoading = false,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl">

                {/* Header */}
                <div className="flex items-start justify-between p-6 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                            <AlertTriangle size={22} />
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-[#171717]">
                                {title}
                            </h2>

                            <p className="text-xs text-text-secondary mt-1">
                                Please confirm this action
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isLoading}
                        className="p-1.5 rounded-lg text-text-secondary hover:bg-[#F6F3F2] hover:text-[#171717] transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Content */}
                <div className="px-6 pb-6">
                    <p className="text-sm text-[#555] leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 px-6 py-4 border-t border-border bg-background rounded-b-2xl">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isLoading}
                        className="px-4 py-2.5 rounded-lg border border-border bg-white text-[#171717] text-sm font-medium hover:bg-[#F6F3F2] transition-colors disabled:opacity-50"
                    >
                        {cancelText}
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="min-w-34 flex justify-center items-center px-4 py-2.5 rounded-lg bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors disabled:opacity-60"
                    >
                        {isLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/> : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;