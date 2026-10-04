import InputField from "../helpers/InputField";
import { ArrowLeft, ArrowRight } from "lucide-react";

const SellerInformation = ({
    formData,
    errors,
    updateField,
    onBack,
    onNext,
}) => {
    return (
        <div>

            <div className="mb-7">
                <span className="inline-flex px-2 py-1 rounded bg-[#F3E8DF] text-[#954518] text-[11px] uppercase tracking-wider font-semibold">
                    Step 2 of 3
                </span>

                <h2 className="text-2xl font-semibold text-[#171717] mt-3">
                    Your Information
                </h2>

                <p className="text-sm text-[#737373] mt-1">
                    Provide your contact details for your seller application.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Full Name */}
                <InputField
                    label="Full Name"
                    required
                    value={formData.fullName}
                    onChange={(value) =>
                        updateField("fullName", value)
                    }
                    error={errors.fullName}
                    placeholder="Enter your full name"
                    />

                {/* Email */}
                <InputField
                    label="Email"
                    required
                    type="email"
                    emailEnable={true}
                    value={formData.email}
                    error={errors.email}
                    onChange={(value) =>
                        updateField("email", value)
                    }
                    placeholder="Enter your email"
                    />

                {/* Phone */}
                <InputField
                    label="Phone Number"
                    required
                    error={errors.phone}
                    type="tel"
                    value={formData.phone}
                    onChange={(value) =>
                        updateField("phone", value)
                    }
                    placeholder="Enter your phone number"
                    />

                {/* City */}
                <InputField
                    label="City"
                    required
                    error={errors.city}
                    value={formData.city}
                    onChange={(value) =>
                        updateField("city", value)
                    }
                    placeholder="Enter your city"
                />

                {/* Address */}
                <div className="md:col-span-2">
                    <InputField
                        label="Address"
                        required
                        error={errors.address}
                        value={formData.address}
                        onChange={(value) =>
                            updateField("address", value)
                        }
                        placeholder="Enter your complete address"
                    />
                </div>

            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#E7E2DC]">

                <button
                    type="button"
                    onClick={onBack}
                    className="px-5 py-2.5 rounded-lg bg-[#F6F3F2] text-[#171717] text-sm font-semibold hover:bg-[#EAE7E7] transition-colors flex items-center gap-2"
                >
                    <ArrowLeft size={17} />
                    Back
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

export default SellerInformation;