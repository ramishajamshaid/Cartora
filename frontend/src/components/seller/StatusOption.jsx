function StatusOption({
    value,
    selected,
    onChange,
    dot,
    description,
}) {
    return (
        <label className="flex items-start gap-3 p-3 rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container transition">
            <input
                type="radio"
                name="productStatus"
                value={value}
                checked={selected}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1 accent-[#954518]"
            />

            <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium text-on-surface">
                        {value}
                    </span>

                    <span
                        className={`inline-block w-2 h-2 rounded-full ${dot}`}
                    />
                </div>

                <span className="text-xs text-text-secondary">
                    {description}
                </span>
            </div>
        </label>
    );
}

export default StatusOption;