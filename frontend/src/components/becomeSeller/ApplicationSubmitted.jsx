import { CheckCircle2 } from "lucide-react";
import {Link} from 'react-router-dom'
const ApplicationSubmitted = () => {
    return (
        <div className="bg-white border border-[#E7E2DC] rounded-xl shadow-[0_2px_12px_rgba(70,48,38,0.04)] p-8 sm:p-12 text-center">

            <div className="w-20 h-20 rounded-full bg-[#2F7D5A]/10 text-[#2F7D5A] flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 size={44} />
            </div>

            <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[#2F7D5A]">
                Application Received
            </span>

            <h2 className="text-2xl sm:text-3xl font-semibold text-[#171717] mt-2">
                Application Submitted
            </h2>

            <p className="text-sm text-[#737373] max-w-md mx-auto mt-3 leading-relaxed">
                Your seller application has been submitted successfully and
                is currently under review.
            </p>

            <div className="max-w-sm mx-auto mt-7 p-4 rounded-xl bg-[#F6F3F2] text-left">
                <p className="text-xs text-[#737373]">
                    Application Status
                </p>

                <div className="flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 rounded-full bg-[#C58A28]" />

                    <span className="text-sm font-semibold text-[#171717]">
                        Pending Review
                    </span>
                </div>
            </div>

            <Link
                to="/profile"
                className="inline-flex items-center justify-center mt-7 px-6 py-2.5 rounded-lg bg-[#954518] text-white text-sm font-semibold hover:bg-[#7f3b15] transition-colors"
            >
                Back to Profile
            </Link>

        </div>
    );
};

export default ApplicationSubmitted;