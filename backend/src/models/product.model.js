import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        store: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Store",
            required: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        comparePrice: {
            type: Number,
            min: 0,
        },

        stock: {
            type: Number,
            required: true,
            min: 0,
        },

        sku: {
            type: String,
            unique: true,
            required:true,
            trim: true,
        },

        category: {
            type: String,
            required: true,
            trim: true,
        },

        subcategory: {
            type: String,
            trim: true,
        },

        brand: {
            type: String,
            trim: true,
        },

        condition: {
            type: String,
            enum: ["new", "used", "refurbished"],
            default: "new",
        },

        tags: [
            {
                type: String,
                trim: true,
            },
        ],

        images: [
            {
                type: String,
            },
        ],

        status: {
            type: String,
            enum: ["draft", "active", "inactive"],
            default: "draft",
        },
    },
    {
        timestamps: true,
    }
);

export const Product = mongoose.model("Product", productSchema);