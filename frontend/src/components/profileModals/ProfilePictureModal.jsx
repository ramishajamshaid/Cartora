import { useRef, useState } from "react";
import { Camera, X, Upload } from "lucide-react";
import api from "../../api/api";
import { useContext } from "react";
import { toast } from "sonner";

const ProfilePictureModal = ({ isOpen, onClose, currentAvatar, setUser }) => {
    const fileInputRef = useRef(null);
    const [preview, setPreview] = useState(currentAvatar || null);
    const [isLoading, setIsLoading] = useState(false)

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async () => {
        const file = fileInputRef.current?.files[0];

        const formData = new FormData();
        formData.append("profile_image", file);
        setIsLoading(true)
        try {
            const res = await api.patch('/users/profile-image', formData)
            if (res.data?.success) {
                console.log(res.data?.data);
                setUser(res.data?.data)
                toast.success("Profile picture updated.")
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong while updating profile picture")
        } finally {
            onClose();
            setIsLoading(false)
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="w-full max-w-sm bg-surface rounded-xl border border-border shadow-xl p-6"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-lg font-semibold text-text-primary">
                            Profile Picture
                        </h2>
                        <p className="text-xs text-text-secondary mt-1">
                            Update your profile photo.
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg bg-surface-container-low hover:bg-accent-light text-text-secondary hover:text-primary flex items-center justify-center transition-colors"
                    >
                        <X size={17} />
                    </button>
                </div>

                {/* Preview */}
                <div className="flex justify-center mb-6">
                    <div className="relative w-28 h-28 rounded-full overflow-hidden bg-accent-light border-4 border-surface-container">
                        {preview ? (
                            <img
                                src={preview}
                                alt="Profile preview"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-primary">
                                <Camera size={32} />
                            </div>
                        )}
                    </div>
                </div>

                {/* File Input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                />

                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-border bg-surface-container-low hover:bg-accent-light text-text-primary hover:text-primary text-sm font-semibold transition-colors"
                >
                    <Upload size={16} />
                    Choose Photo
                </button>

                {/* Actions */}
                <div className="flex gap-3 mt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-4 py-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-text-primary text-sm font-semibold transition-colors"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!preview || isLoading}
                        className="flex-1 px-4 py-2.5 flex justify-center items-center rounded-lg bg-primary hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
                    >
                        {
                            isLoading?
                            (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ):
                            "Save Photo"
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePictureModal;
