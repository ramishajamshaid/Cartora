import {ArrowLeft,
    Check,
    CheckCircle2,
    Store,} from "lucide-react"
const StepIndicator = ({
    number,
    title,
    active,
    completed,
}) => {
    return (
        <div className="flex items-center gap-2 flex-shrink-0">

            <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                    completed
                        ? "bg-[#F3E8DF] text-[#954518]"
                        : active
                        ? "bg-[#954518] text-white shadow-sm"
                        : "bg-[#F0EDED] text-[#737373]"
                }`}
            >
                {completed ? (
                    <Check size={16} />
                ) : (
                    number
                )}
            </div>

            <span
                className={`hidden sm:block text-xs font-medium whitespace-nowrap ${
                    active || completed
                        ? "text-[#171717]"
                        : "text-[#737373]"
                }`}
            >
                {title}
            </span>

        </div>
    );
};

export default StepIndicator;