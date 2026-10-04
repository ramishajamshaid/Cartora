import mongoose from 'mongoose';
import { SellerApplication } from '../models/sellerApplication.model.js';
import { Store } from '../models/store.model.js';
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js';

const createSellerApplication = asyncHandler(async (req, res) => {
    const { storeName, category, description, email, phone, address, city } = req.body
    const storeLogo = req.file?.path
    const user = req.user._id
    if ([storeName, category, description, email, phone, address, city].some(item => !item?.trim())) {
        throw new ApiError(400, "All fields are required")
    }
    const existingUser = await User.findOne({email: email, _id:user})
    if(!existingUser){
        throw new ApiError(404, "Incorrect email provided")
    }
    let uploadedLogo;
    if (storeLogo) {
        uploadedLogo = await uploadOnCloudinary(storeLogo)
        if (!uploadedLogo?.url) {
            throw new ApiError(500, "Error while uploading store logo")
        }
    }
    const existingApplication = await SellerApplication.findOne({
        user: req.user._id,
        status: { $in: ["pending", "approved"] }
    });

    if (existingApplication) {
        if (existingApplication.status === "approved") {
            throw new ApiError(409, "You are already a seller");
        }

        throw new ApiError(
            409,
            "You already have a pending seller application"
        )
    }

    const existingStore = await Store.findOne({
        storeName: {
            $regex: `^${storeName.trim()}$`,
            $options: "i"
        }
    });

    if (existingStore) {
        throw new ApiError(
            409,
            "A store with this name already exists"
        );
    }

    const sellerApplication = await SellerApplication.create({
        user: user,
        storeName: storeName.trim(),
        storeCategory: category.trim(),
        storeDescription: description.trim(),
        storeLogo: uploadedLogo?.url || null,
        status: "pending",
        phone: phone.trim(),
        city: city.trim(),
        address: address.trim()
    })

    const createdApplication = await SellerApplication.findById(sellerApplication._id)
    if (!createdApplication) {
        throw new ApiError(500, "Something went wrong while creating application")
    }

    return res
        .status(201)
        .json(
            new ApiResponse(201, createdApplication, "Seller Application Created")
        )
})

const getMySellerApplication = asyncHandler(async (req, res) => {
    const application = await SellerApplication.findOne({
        user: req.user._id,
        status: { $in: ["pending", "approved"] }
    });

    if (!application) {
        throw new ApiError(404, "No seller application found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            application,
            "Seller application fetched successfully"
        )
    );
});

const approveSellerApplication = asyncHandler(async (req, res) => {
    const session = await mongoose.startSession()

    try {
        session.startTransaction()
        const { id } = req.params;

        if (!id) {
            throw new ApiError(400, "Seller application ID is required")
        }

        const application = await SellerApplication.findByIdAndUpdate(
            id,
            {
                $set: { status: "approved" }
            },
            {
                returnDocument: "after",
                session
            }
        )

        if (!application) {
            throw new ApiError(404, "Seller Application not found")
        }

        if (application.status !== "approved") {
            throw new ApiError(500, "Seller Application status updation failed")
        }

        const store = await Store.create([
            {
                owner: application.user,
                storeName: application.storeName.trim(),
                storeCategory: application.storeCategory.trim(),
                storeDescription: application.storeDescription.trim(),
                storeLogo: application.storeLogo || null,
                phone: application.phone.trim(),
                city: application.city.trim(),
                address: application.address.trim()
            }
        ],
            { session }
        )

        const createdStore = store[0]

        if (!createdStore) {
            throw new ApiError(500, "Something went wrong while creating store")
        }

        const updatedUser = await User.findByIdAndUpdate(
            application.user,
            {
                role: "seller"
            },
            {
                returnDocument: "after",
                session
            }
        )

        if (!updatedUser) {
            throw new ApiError(404, "User not found");
        }

        await session.commitTransaction()

        const populateStore = await Store.findById(createdStore._id).populate("owner", "-password -refreshToken")

        return res
            .status(201)
            .json(
                new ApiResponse(201, populateStore, "seller applcation approved successfully")
            )
    } catch (error) {
        await session.abortTransaction()
        throw error;
    } finally {
        await session.endSession()
    }

})

const rejectSellerApplication = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(400, "Seller application ID is required");
    }

    const application = await SellerApplication.findByIdAndUpdate(
        {
            id,
            status: "pending"
        },
        {
            $set: {
                status: "rejected",
            },
        },
        {
            new: true,
        }
    );

    if (!application) {
        throw new ApiError(404, "Seller application not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                application,
                "Seller application rejected successfully"
            )
        );
});

export { createSellerApplication, getMySellerApplication, approveSellerApplication, rejectSellerApplication }