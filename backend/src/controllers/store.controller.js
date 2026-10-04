import { User } from '../models/user.model.js';
import { Store } from '../models/store.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js';

const getStoreInfo = asyncHandler(async (req, res) => {
    const store = await Store.findOne({ owner: req.user?._id }).populate("owner", "email")
    console.log(store);

    return res
        .status(200)
        .json(
            new ApiResponse(200, store, "Store fetched successfully")
        )
})

const updateStoreInfo = asyncHandler(async (req, res) => {
    const { storeName, category, description, email, phone, city, address } = req.body
    const storeLogo = req.file?.path

    if ([storeName, category, description, email, phone, city, address].some(field => field.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const updateData = {
        storeName,
        storeCategory: category,
        storeDescription: description,
        email,
        phone,
        city,
        address,
    };

    if (storeLogo) {
        const uploadedLogo = await uploadOnCloudinary(storeLogo);

        if (uploadedLogo?.url) {
            updateData.storeLogo = uploadedLogo.url;
        }
    }

    const updatedStore = await Store.findOneAndUpdate(
        { owner: req.user._id },
        { $set: updateData },
        { returnDocument: 'after' }
    ).populate("owner", "email");

    if (!updatedStore) {
        throw new ApiError(404, "Store not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, updatedStore, "Store updated successfully")
        )
})

export { getStoreInfo, updateStoreInfo }