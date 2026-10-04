import React from 'react'

function SellerDashboardStat({title, description, value, Icon}) {
    return (
        <div
            key={title}
            className="rounded-xl bg-surface p-4 shadow-sm transition hover:shadow-md"
        >
            <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                    {title}
                </span>

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-container-low text-primary">
                    <Icon size={18} />
                </div>
            </div>

            <p className="text-2xl font-semibold leading-tight text-on-surface">
                {value}
            </p>

            <p className="mt-1 text-xs text-text-secondary">
                {description}
            </p>
        </div>
    )
}

export default SellerDashboardStat
