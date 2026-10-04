import React, { useState } from "react";
import { AlertTriangle, X } from "lucide-react";

const WarningModal = ({
    isOpen,
    onClose,
    onConfirm,
    name,
    isLoading = false,
}) => {
    const [message, setMessage] = useState("");

    if (!isOpen) return null;

    const handleClose = () => {
        if (isLoading) return;

        setMessage("");
        onClose();
    };

    const handleConfirm = () => {
        if (!message.trim()) return;

        onConfirm(message);

        setMessage("");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
                {/* Header */}
                <div className="flex items-start justify-between p-6 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-50 text-amber-500">
                            <AlertTriangle size={22} />
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-[#171717]">
                                Send Warning
                            </h2>

                            <p className="mt-1 text-xs text-text-secondary">
                                Send a warning to {name}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={isLoading}
                        className="rounded-lg p-1.5 text-text-secondary transition-colors hover:bg-[#F6F3F2] hover:text-[#171717]"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Content */}
                <div className="px-6 pb-6">
                    <label className="mb-2 block text-sm font-medium text-[#171717]">
                        Warning Message
                    </label>

                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={5}
                        placeholder="Write the reason for this warning..."
                        disabled={isLoading}
                        className="w-full resize-none rounded-lg border border-border bg-background p-3 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
                    />

                    <p className="mt-1.5 text-xs text-text-secondary">
                        This warning will be recorded for administrative reference.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 rounded-b-2xl border-t border-border bg-background px-6 py-4">
                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={isLoading}
                        className="rounded-lg border border-border bg-white px-4 py-2.5 text-sm font-medium text-[#171717] transition-colors hover:bg-[#F6F3F2] disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleConfirm}
                        disabled={!message.trim() || isLoading}
                        className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-container disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isLoading ? "Sending..." : "Send Warning"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WarningModal;