const InputField = ({
    label,
    error,
    required,
    value,
    onChange,
    placeholder,
    type = "text",
    editEnable=true,
    emailEnable=true
}) => {
    const isEditable = type==="email"? emailEnable: editEnable
    return (
        <div>
            <label className="block text-sm font-medium text-[#171717] mb-2">
                {label}

                {required && (
                    <span className="text-[#954518]"> *</span>
                )}
            </label>

            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                disabled={!isEditable}
                className="w-full h-11 px-4 rounded-lg bg-[#F6F3F2] border border-transparent focus:bg-white focus:border-[#954518] focus:ring-2 focus:ring-[#954518]/10 outline-none text-sm transition-all"
            />
            {error && (
                <p className="text-red-500 text-[14px] mt-1">
                    {error}
                </p>
            )}
        </div>
    );
};

export default InputField;