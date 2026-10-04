import { Plus } from "lucide-react";

function ImageSlot({ title, subtitle }) {
    return (
        <div className="rounded-xl bg-surface-container-low flex flex-col items-center justify-center text-center p-4 aspect-square hover:bg-surface-container-high transition cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-text-secondary group-hover:text-primary shadow-sm mb-2">
                <Plus size={20} />
            </div>

            <span className="text-sm font-medium text-on-surface">
                {title}
            </span>

            <span className="text-xs text-text-secondary mt-0.5">
                {subtitle}
            </span>
        </div>
    );
}

export default ImageSlot;