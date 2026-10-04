import { Package } from "lucide-react";
import { formateDate } from "../../calculations";
import {useNavigate} from 'react-router-dom'

function ProductRow({
    product,
    selectedProducts,
    toggleProduct,
    getStockColor,
    getStatusStyles,
    stockPercentage,
}) {
    const navigate = useNavigate()
    return (
        <tr
            className="hover:bg-surface-container-low/60 transition-colors group"
        >
            {/* Checkbox */}
            <td className="py-4 pl-6 pr-2">
                <input
                    type="checkbox"
                    checked={selectedProducts.includes(product._id)}
                    onChange={() => toggleProduct(product._id)}
                    className="w-4 h-4 accent-primary cursor-pointer"
                />
            </td>

            {/* Image */}
            <td className="py-4 px-2">
                <div className="w-14 h-14 rounded-lg bg-surface-container-low overflow-hidden flex items-center justify-center text-primary">
                    {product.images?.length > 0 ? (
                        <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    ) : (
                        <Package size={22} />
                    )}
                </div>
            </td>

            {/* Product */}
            <td className="py-4 px-4 min-w-60">
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-text-primary group-hover:text-primary transition-colors cursor-pointer">
                        {product.title}
                    </span>

                    <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-text-secondary font-mono">
                            {product.sku}
                        </span>

                        <span className="w-1 h-1 rounded-full bg-surface-container-highest" />
                    </div>
                </div>
            </td>

            {/* Category */}
            <td className="py-4 px-4">
                <span className="inline-flex px-2.5 py-1 rounded-full bg-surface-container-low text-text-secondary text-xs">
                    {product.category}
                </span>
            </td>

            {/* Price */}
            <td className="py-4 px-4 text-right text-sm font-semibold text-text-primary">
                ${product.price.toFixed(2)}
            </td>

            {/* Stock */}
            <td className="py-4 px-4">
                <div className="flex flex-col gap-1">
                    <div
                        className={`flex items-center gap-1.5 text-xs ${
                            product.stock <= 5
                                ? product.stock === 0
                                    ? "text-error font-semibold"
                                    : "text-warning font-semibold"
                                : "text-text-primary"
                        }`}
                    >
                        <span
                            className={`w-2 h-2 rounded-full ${getStockColor(
                                product.stock
                            )}`}
                        />

                        <span>
                            {product.stock === 0
                                ? "0 out of stock"
                                : `${product.stock} in stock`}
                        </span>
                    </div>

                    <div className="w-24 h-1.5 rounded-full bg-surface-container overflow-hidden">
                        <div
                            className={`h-full rounded-full ${getStockColor(
                                product.stock
                            )}`}
                            style={{
                                width: `${stockPercentage}%`,
                            }}
                        />
                    </div>
                </div>
            </td>

            {/* Status */}
            <td className="py-4 px-4">
                <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyles(
                        product.status
                    )}`}
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {product.status}
                </span>
            </td>

            {/* Date */}
            <td className="py-4 px-4 text-xs text-text-secondary whitespace-nowrap">
                {formateDate(product.createdAt)}
            </td>

            {/* Actions */}
            <td className="py-4 pl-4 pr-6">
                <button
                    onClick={()=>navigate(`/admin/product-detail/${product._id}`)}
                    type="button"
                    title="View Details"
                    className="p-1.5 text-[14px] rounded-lg text-primary hover:bg-accent-light transition-colors cursor-pointer"
                >
                    View
                </button>
            </td>
        </tr>
    );
}

export default ProductRow;