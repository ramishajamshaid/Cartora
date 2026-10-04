import mongoose from 'mongoose'

const sellerApplicationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        storeName: {
            type: String,
            required: true,
            trim: true,
        },

        storeCategory: {
            type: String,
            required: true
        },

        storeDescription: {
            type: String,
            required: true,
            trim: true
        },

        storeLogo: {
            type: String,
            default: null,
        },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending"
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },

        city: {
            type: String,
            required: true,
            trim: true,
        },

        address: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);


export const SellerApplication = mongoose.model("SellerApplication", sellerApplicationSchema)