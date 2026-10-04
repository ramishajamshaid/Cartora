import {
    ArrowRight,
    CloudUpload,
    Trash2,
} from "lucide-react";
import { CATEGORIES } from "../../data/categories";

const StoreInformation = ({
    formData,
    errors,
    updateField,
    preview,
    handleLogoChange,
    removeLogo,
    onNext,
}) => {

    return (
        <div>

            <div className="mb-7">
                <span className="inline-flex px-2 py-1 rounded bg-[#F3E8DF] text-[#954518] text-[11px] uppercase tracking-wider font-semibold">
                    Step 1 of 3
                </span>

                <h2 className="text-2xl font-semibold text-[#171717] mt-3">
                    Create Your Store
                </h2>

                <p className="text-sm text-[#737373] mt-1">
                    Tell us about the store you want to create on Cartora.
                </p>
            </div>

            <div className="space-y-6">

                {/* Store Name */}
                <div>
                    <label className="block text-sm font-medium text-[#171717] mb-2">
                        Store Name <span className="text-[#954518]">*</span>
                    </label>

                    <input
                        type="text"
                        value={formData.storeName}
                        onChange={(e) =>
                            updateField("storeName", e.target.value)
                        }
                        placeholder="Enter your store name"
                        className="w-full h-11 px-4 rounded-lg bg-[#F6F3F2] border border-transparent focus:bg-white focus:border-[#954518] focus:ring-2 focus:ring-[#954518]/10 outline-none text-sm transition-all"
                    />

                    {errors.storeName && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.storeName}
                        </p>
                    )}
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm font-medium text-[#171717] mb-2">
                        Store Category <span className="text-[#954518]">*</span>
                    </label>

                    <select
                        value={formData.category}
                        onChange={(e) =>
                            updateField("category", e.target.value)
                        }
                        className="w-full h-11 px-4 rounded-lg bg-[#F6F3F2] border border-transparent focus:bg-white focus:border-[#954518] focus:ring-2 focus:ring-[#954518]/10 outline-none text-sm transition-all"
                    >
                        <option value="">Select a category</option>

                        {CATEGORIES.map((category) => (
                            <option key={category.value} value={category.value}>
                                {category.label}
                            </option>
                        ))}
                    </select>
                    {errors.storeCategory && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.storeCategory}
                        </p>
                    )}
                </div>

                {/* Description */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-[#171717]">
                            Store Description{" "}
                            <span className="text-[#954518]">*</span>
                        </label>

                        <span className="text-xs text-[#737373]">
                            {formData.description.length} / 500
                        </span>
                    </div>

                    <textarea
                        rows="5"
                        maxLength="500"
                        value={formData.description}
                        onChange={(e) =>
                            updateField("description", e.target.value)
                        }
                        placeholder="Briefly describe what your store sells..."
                        className="w-full p-4 rounded-lg bg-[#F6F3F2] border border-transparent focus:bg-white focus:border-[#954518] focus:ring-2 focus:ring-[#954518]/10 outline-none text-sm resize-none transition-all"
                    />
                    {errors.storeDescription && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.storeDescription}
                        </p>
                    )}
                </div>

                {/* Logo */}
                <div>
                    <label className="block text-sm font-medium text-[#171717] mb-2">
                        Store Logo{" "}
                        <span className="text-xs font-normal text-[#737373]">
                            (Optional)
                        </span>
                    </label>

                    {preview ? (
                        <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-[#F6F3F2] border border-[#E7E2DC]">

                            <div className="flex items-center gap-4 min-w-0">
                                <img
                                    src={preview}
                                    alt="Store logo preview"
                                    className="w-16 h-16 rounded-lg object-cover border border-[#E7E2DC]"
                                />

                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-[#171717] truncate">
                                        {formData.storeLogo?.name}
                                    </p>

                                    <p className="text-xs text-[#737373] mt-1">
                                        Logo uploaded successfully
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={removeLogo}
                                className="p-2 rounded-lg text-[#737373] hover:text-red-500 hover:bg-red-50 transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ) : (
                        <label className="block cursor-pointer">
                            <div className="rounded-xl border-2 border-dashed border-[#E7E2DC] p-8 text-center hover:border-[#954518]/40 hover:bg-[#F6F3F2]/50 transition-all">

                                <div className="w-12 h-12 rounded-full bg-[#F3E8DF] text-[#954518] flex items-center justify-center mx-auto mb-3">
                                    <CloudUpload size={22} />
                                </div>

                                <p className="text-sm font-medium text-[#171717]">
                                    Upload Store Logo
                                </p>

                                <p className="text-xs text-[#737373] mt-1">
                                    PNG, JPG or WEBP
                                </p>
                            </div>

                            <input
                                type="file"
                                accept="image/png,image/jpeg,image/webp"
                                onChange={handleLogoChange}
                                className="hidden"
                            />
                        </label>
                    )}
                </div>

            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#E7E2DC]">

                <button
                    type="button"
                    className="px-5 py-2.5 rounded-lg bg-[#F6F3F2] text-[#171717] text-sm font-semibold hover:bg-[#EAE7E7] transition-colors"
                >
                    Cancel
                </button>

                <button
                    type="button"
                    onClick={onNext}
                    className="px-6 py-2.5 rounded-lg bg-[#954518] text-white text-sm font-semibold hover:bg-[#7f3b15] transition-colors flex items-center gap-2 shadow-sm"
                >
                    Continue
                    <ArrowRight size={17} />
                </button>

            </div>

        </div>
    );
};

export default StoreInformation;