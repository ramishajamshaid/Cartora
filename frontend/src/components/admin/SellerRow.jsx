import { MoreVertical } from "lucide-react";
import { formateDate } from "../../calculations";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function SellerRow({ seller }) {
    const navigate = useNavigate()
    const [status, setStatus] = useState("")
    const statusStyles = {
        approved: "bg-[#F0F7F4] text-success",
        pending: "bg-[#FDF8EF] text-warning",
        rejected: "bg-[#FCF0F0] text-error",
    };
    useEffect(()=>{
        setStatus(seller?.status || "approved")
    },[])   
    

    return (
        <tr className="border-t border-border hover:bg-surface-container-low/60 transition-colors">
            {/* Seller */}
            <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent-light text-primary flex items-center justify-center font-semibold shrink-0 overflow-hidden">
                        {seller.storeLogo?
                            (<img src={seller.storeLogo} alt={seller.storeName.charAt(0)}/>):
                            (seller.storeName.charAt(0))
                        }
                    </div>

                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-text-primary truncate">
                            {seller.storeName}
                        </p>
                    </div>
                </div>
            </td>

            {/* Category */}
            <td className="px-5 py-4">
                <span className="inline-flex px-2.5 py-1 rounded-full bg-surface-container-low text-xs text-on-surface-variant">
                    {seller.storeCategory}
                </span>
            </td>

            {/* Products */}
            <td className="px-5 py-4 text-right text-sm font-medium text-text-primary">
                0 items
            </td>

            {/* Status */}
            <td className="px-5 py-4 text-center">
                <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {status}
                </span>
            </td>

            {/* Joined */}
            <td className="px-5 py-4 text-sm text-text-secondary">
                {formateDate(seller.createdAt)}
            </td>

            {/* Actions */}
            <td className="px-5 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                    <button
                        onClick={() => navigate(`/admin/seller-detail/${seller._id}`)}
                        className="px-3 py-1.5 rounded-lg text-primary hover:bg-accent-light text-xs font-medium transition cursor-pointer"
                    >
                        View
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default SellerRow;