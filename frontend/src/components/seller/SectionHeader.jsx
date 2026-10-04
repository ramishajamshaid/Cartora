function SectionHeader({ icon, title, step }) {
    return (
        <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2">
                <span className="text-primary">{icon}</span>

                <h2 className="text-lg font-semibold text-on-surface">
                    {title}
                </h2>
            </div>

            <span className="text-[11px] uppercase tracking-wider text-primary font-semibold bg-accent-light px-2.5 py-1 rounded-full">
                {step}
            </span>
        </div>
    );
}

export default SectionHeader;