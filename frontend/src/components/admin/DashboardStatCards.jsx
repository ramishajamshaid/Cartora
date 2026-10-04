import { TrendingUp } from 'lucide-react'
import React from 'react'

function DashboardStatCards({title,Icon,value, change, period}) {
    return (
        <div
            key={title}
            className="rounded-xl border border-border bg-white p-6"
        >
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-text-secondary">
                    {title}
                </span>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F3E8DF] text-[#954518]">
                    <Icon/>
                </div>
            </div>

            <div className="mt-5">
                <h2 className="text-2xl font-semibold text-[#171717]">
                    {value}
                </h2>

                <div className="mt-2 flex items-center gap-1.5">
                    <span className="flex items-center text-xs font-semibold text-success">
                        <TrendingUp size={14} />
                        {change}
                    </span>

                    <span className="text-xs text-text-secondary">
                        {period}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default DashboardStatCards
