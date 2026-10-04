import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api.js"
import StepIndicator from "../../components/becomeSeller/StepIndicator";
import StoreInformation from "../../components/becomeSeller/StoreInformation";
import SellerInformation from "../../components/becomeSeller/SellerInformation";
import ReviewApplication from "../../components/becomeSeller/ReviewApplication";
import ApplicationSubmitted from "../../components/becomeSeller/ApplicationSubmitted";
import {toast} from 'sonner'

const BecomeSellerPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const [preview, setPreview] = useState(null);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        storeName: "",
        category: "",
        description: "",
        storeLogo: null,
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
    });


    const updateField = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleLogoChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        updateField("storeLogo", file);
        setPreview(URL.createObjectURL(file));
    };

    const validateStoreInfo = () => {
        const errors = {};

        if (!formData.storeName.trim()) {
            errors.storeName = "Store name is required";
        }

        if (!formData.category) {
            errors.storeCategory = "Please select a category";
        }

        if (!formData.description.trim()) {
            errors.storeDescription = "Store description is required";
        }

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const validateSellerInfo = () => {
        const errors = {};

        if (!formData.fullName.trim()) {
            errors.fullName = "Full name is required";
        }

        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = "Please enter a valid email";
        }

        if (!formData.phone.trim()) {
            errors.phone = "Phone number is required";
        }

        if (!formData.city.trim()) {
            errors.city = "City is required";
        }

        if (!formData.address.trim()) {
            errors.address = "Address is required";
        }

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const removeLogo = () => {
        updateField("storeLogo", null);
        setPreview(null);
    };

    const nextStep = () => {
        if (currentStep === 1) {
            if (!validateStoreInfo()) return;
        }

        if (currentStep === 2) {
            if (!validateSellerInfo()) return;
        }

        setCurrentStep((prev) => prev + 1);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const previousStep = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handleSubmit = async () => {
        if (!confirmed) return;
        const data = new FormData();

        data.append("storeName", formData.storeName);
        data.append("category", formData.category);
        data.append("description", formData.description);
        data.append("fullName", formData.fullName);
        data.append("email", formData.email);
        data.append("phone", formData.phone);
        data.append("address", formData.address);
        data.append("city", formData.city);
        data.append("storeLogo", formData.storeLogo);


        try {
            setIsSubmitting(true);
            const res = await api.post("/seller-application/create-seller-application", data)
            if (res.data?.success) {
                console.log(res.data?.data);
                setIsSubmitted(true)
                toast.success("Seller Application successfull.")
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Seller Application failed.")
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <main className="min-h-screen bg-background pt-24 pb-12">

            {/* Page Header */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6">

                <div className="text-center mb-8">
                    <p className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[#954518] mb-2">
                        Seller Registration
                    </p>

                    <h1 className="text-3xl sm:text-4xl font-bold text-[#171717] tracking-tight">
                        Become a Seller
                    </h1>

                    <p className="text-sm sm:text-base text-[#737373] mt-2 max-w-xl mx-auto">
                        Set up your store and submit your application to start
                        selling on Cartora.
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="bg-white border border-border rounded-xl px-4 sm:px-8 py-5 mb-6">
                    <div className="flex items-center justify-between max-w-3xl mx-auto">

                        <StepIndicator
                            number="01"
                            title="Store Information"
                            active={currentStep === 1}
                            completed={currentStep > 1}
                        />

                        <div
                            className={`h-0.5 flex-1 mx-2 sm:mx-4 rounded ${currentStep > 1
                                ? "bg-[#954518]"
                                : "bg-[#E7E2DC]"
                                }`}
                        />

                        <StepIndicator
                            number="02"
                            title="Your Information"
                            active={currentStep === 2}
                            completed={currentStep > 2}
                        />

                        <div
                            className={`h-0.5 flex-1 mx-2 sm:mx-4 rounded ${currentStep > 2
                                ? "bg-[#954518]"
                                : "bg-[#E7E2DC]"
                                }`}
                        />

                        <StepIndicator
                            number="03"
                            title="Review & Submit"
                            active={currentStep === 3}
                            completed={isSubmitted}
                        />

                    </div>
                </div>

                {/* Main Content */}
                {!isSubmitted ? (
                    <div className="bg-white border border-border rounded-xl shadow-[0_2px_12px_rgba(70,48,38,0.04)] p-5 sm:p-8">

                        {/* STEP 1 */}
                        {currentStep === 1 && (
                            <StoreInformation
                                formData={formData}
                                updateField={updateField}
                                preview={preview}
                                handleLogoChange={handleLogoChange}
                                removeLogo={removeLogo}
                                onNext={nextStep}
                                errors={errors}
                            />
                        )}

                        {/* STEP 2 */}
                        {currentStep === 2 && (
                            <SellerInformation
                                formData={formData}
                                updateField={updateField}
                                onBack={previousStep}
                                onNext={nextStep}
                                errors={errors}
                            />
                        )}

                        {/* STEP 3 */}
                        {currentStep === 3 && (
                            <ReviewApplication
                                formData={formData}
                                preview={preview}
                                confirmed={confirmed}
                                setConfirmed={setConfirmed}
                                onBack={previousStep}
                                onSubmit={handleSubmit}
                                isSubmitting={isSubmitting}
                                setCurrentStep={setCurrentStep}
                            />
                        )}

                    </div>
                ) : (
                    <ApplicationSubmitted />
                )}

            </div>
        </main>
    );
};

export default BecomeSellerPage;