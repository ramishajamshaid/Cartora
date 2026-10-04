import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        storeName: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        storeCategory: {
            type: String,
            required: true,
            trim: true,
        },

        storeDescription: {
            type: String,
            required: true,
            trim: true,
        },

        storeLogo: {
            type: String,
            default: null,
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

export const Store = mongoose.model("Store", storeSchema);