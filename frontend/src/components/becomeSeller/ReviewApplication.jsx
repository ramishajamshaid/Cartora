import ReviewSection from "../helpers/ReviewSection";
import ReviewRow from "../helpers/ReviewRow";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
const ReviewApplication = ({
    formData,
    preview,
    confirmed,
    setConfirmed,
    onBack,
    onSubmit,
    isSubmitting,
    setCurrentStep,
}) => {
    return (
        <div>

            <div className="mb-7">
                <span className="inline-flex px-2 py-1 rounded bg-[#F3E8DF] text-[#954518] text-[11px] uppercase tracking-wider font-semibold">
                    Step 3 of 3
                </span>

                <h2 className="text-2xl font-semibold text-[#171717] mt-3">
                    Review Your Application
                </h2>

                <p className="text-sm text-[#737373] mt-1">
                    Review your information before submitting your application.
                </p>
            </div>

            <div className="space-y-5">

                {/* Store Info */}
                <ReviewSection
                    title="Store Information"
                    onEdit={() => setCurrentStep(1)}
                >
                    <ReviewRow
                        label="Store Name"
                        value={formData.storeName}
                    />

                    <ReviewRow
                        label="Category"
                        value={formData.category}
                    />

                    <ReviewRow
                        label="Description"
                        value={formData.description}
                    />

                    {preview && (
                        <div className="flex items-center gap-3 pt-2">
                            <span className="text-xs text-[#737373] w-28">
                                Store Logo
                            </span>

                            <img
                                src={preview}
                                alt="Store logo"
                                className="w-12 h-12 rounded-lg object-cover border border-[#E7E2DC]"
                            />
                        </div>
                    )}
                </ReviewSection>

                {/* Seller Info */}
                <ReviewSection
                    title="Your Information"
                    onEdit={() => setCurrentStep(2)}
                >
                    <ReviewRow
                        label="Full Name"
                        value={formData.fullName}
                    />

                    <ReviewRow
                        label="Email"
                        value={formData.email}
                    />

                    <ReviewRow
                        label="Phone"
                        value={formData.phone}
                    />

                    <ReviewRow
                        label="Address"
                        value={formData.address}
                    />

                    <ReviewRow
                        label="City"
                        value={formData.city}
                    />
                </ReviewSection>

                {/* Confirmation */}
                <label className="flex items-start gap-3 p-4 rounded-xl bg-[#F6F3F2] cursor-pointer">
                    <input
                        type="checkbox"
                        checked={confirmed}
                        onChange={(e) =>
                            setConfirmed(e.target.checked)
                        }
                        className="mt-1 w-4 h-4 accent-[#954518]"
                    />

                    <div>
                        <p className="text-sm font-medium text-[#171717]">
                            I confirm that the information provided is accurate.
                        </p>

                        <p className="text-xs text-[#737373] mt-1 leading-relaxed">
                            After submitting, your application will be reviewed.
                            Your account will remain a customer account until
                            your application is approved.
                        </p>
                    </div>
                </label>

            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#E7E2DC]">

                <button
                    type="button"
                    onClick={onBack}
                    disabled={isSubmitting}
                    className="px-5 py-2.5 rounded-lg bg-[#F6F3F2] text-[#171717] text-sm font-semibold hover:bg-[#EAE7E7] transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                    <ArrowLeft size={17} />
                    Back
                </button>

                <button
                    type="button"
                    onClick={onSubmit}
                    disabled={!confirmed || isSubmitting}
                    className="px-6 py-2.5 rounded-lg bg-[#954518] text-white text-sm font-semibold hover:bg-[#7f3b15] transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <>
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        <>
                            Submit Application
                            <Check size={17} />
                        </>
                    )}
                </button>

            </div>

        </div>
    );
};

export default ReviewApplication;