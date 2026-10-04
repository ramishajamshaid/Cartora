import React from 'react'

function CategoryCard({name, desc, items, Icon}) {
    return (
        <a
            key={name}
            href="#"
            className="group bg-surface p-4 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all text-center flex flex-col items-center justify-center"
        >
            {/* Icon */}
            <div className="w-14 h-14 rounded-full bg-accent-light text-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                <Icon size={25} strokeWidth={2.2} />
            </div>

            {/* Category Name */}
            <h3 className="font-bold text-sm text-text-primary group-hover:text-primary transition-colors">
                {name}
            </h3>

            {/* Description */}
            <p className="text-[11px] text-text-secondary mt-0.5">
                {desc}
            </p>

            {/* Item Count */}
            <span className="mt-2 text-[10px] font-semibold text-primary bg-accent-light px-2 py-0.5 rounded-full">
                {items}
            </span>
        </a>
    )
}

export default CategoryCard
