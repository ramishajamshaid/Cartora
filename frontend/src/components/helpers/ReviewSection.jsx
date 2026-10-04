const ReviewSection = ({
    title,
    onEdit,
    children,
}) => {
    return (
        <div className="border border-[#E7E2DC] rounded-xl overflow-hidden">

            <div className="flex items-center justify-between px-4 py-3 bg-[#F6F3F2]">
                <h3 className="text-sm font-semibold text-[#171717]">
                    {title}
                </h3>

                <button
                    type="button"
                    onClick={onEdit}
                    className="text-xs font-semibold text-[#954518] hover:underline"
                >
                    Edit
                </button>
            </div>

            <div className="p-4 space-y-3">
                {children}
            </div>

        </div>
    );
};

export default ReviewSection;