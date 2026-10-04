const ReviewRow = ({ label, value }) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
            <span className="text-xs text-[#737373] sm:w-28 flex-shrink-0">
                {label}
            </span>

            <span className="text-sm text-[#171717] break-words">
                {value || "—"}
            </span>
        </div>
    );
};

export default ReviewRow;