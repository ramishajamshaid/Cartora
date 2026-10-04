import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import jwt from 'jsonwebtoken'

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        if (!user) {
            throw new ApiError(401, "User not found")
        }
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        console.log("dono tokens geerate hue: ", accessToken, refreshToken);
        

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {
            refreshToken, accessToken
        }
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong while generating tokens")
    }
}

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken
    console.log("REFRESH REQUEST");
    console.log("Incoming:", incomingRefreshToken);

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decodedToken._id)
        console.log("DB:", user?.refreshToken);

        if (!user) {
            throw new ApiError(401, "Invalid refresh Token")
        }

        if (incomingRefreshToken !== user.refreshToken) {
            console.log("❌ REFRESH TOKEN MISMATCH");
            console.log("Incoming:", incomingRefreshToken);
            console.log("DB:", user.refreshToken);

            throw new ApiError(
                401,
                "Refresh token is expired or used"
            );
        }

        console.log("✅ REFRESH TOKEN MATCH");

        const { accessToken, newRefreshToken } = await generateAccessAndRefreshToken(user._id)

        const options = {
            httpOnly: true,
            secure: false
        }

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(200,
                    { accessToken, newRefreshToken },
                    "Access Token Refreshed successfully"
                )
            )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }
})

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password, username } = req.body
    console.log(req.body);
    if ([fullName, email, password, username].some(item => item.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({ $or: [{ email }, { username }] })

    if (existedUser) {
        throw new ApiError(409, "User with this email or username already exists")
    }

    const user = await User.create({
        fullName: fullName,
        username: username.toLowerCase(),
        email: email,
        password: password,
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res
        .status(201)
        .json(
            new ApiResponse(200, createdUser, "User registered successfully")
        )
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new ApiError(400, "Email and Password are required")
    }

    const existedUser = await User.findOne({ email });

    if (!existedUser) {
        throw new ApiError(401, "User does not exist")
    }

    if(existedUser.accountStatus === "suspended"){
        throw new ApiError(403, "Your account is suspended")
    }

    const isPasswordCorrect = await existedUser.isPasswordCorrect(password)
    if (!isPasswordCorrect) {
        throw new ApiError(402, "Invalid credentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(existedUser._id)
    const user = await User.findById(existedUser._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: false
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(201, { user: user, accessToken, refreshToken }, "User logged in succesfully")
        )
})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $unset: { refreshToken: 1 }
        }
    );

    const options = {
        httpOnly: true,
        secure: false
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(201, {}, "User logged out succesfully")
        )
})

const getUser = asyncHandler(async (req, res) => {
    const { id } = req.user
    if (!id) {
        throw new ApiError(401, "unAuthorized Access")
    }

    const user = await User.findById(id).select("-password -refreshToken")

    return res
        .status(200)
        .json(
            new ApiResponse(201, user, "User fetched successfully")
        )
})

const updateUserProfilePicture = asyncHandler(async (req, res) => {
    console.log(req.file?.path);
    const profile_image = req.file?.path

    if (!profile_image) {
        throw new ApiError(400, "Avatar file is missing")
    }

    const userWithOldAvatar = await User.findById(req.user?._id)
    if (!userWithOldAvatar) {
        throw new ApiError(404, "User not found")
    }

    const oldAvatar = userWithOldAvatar.profile_image
    const newAvatar = await uploadOnCloudinary(profile_image)

    if (!newAvatar?.url) {
        throw new ApiError(500, "Error while uploading Avatar")
    }

    const user = await User.findByIdAndUpdate(req.user?._id,
        {
            $set: {
                profile_image: newAvatar.url
            }
        },
        {
            returnDocument: 'after'
        }
    )

    return res
        .status(200)
        .json(
            new ApiResponse(201, user, "User profile updated successfully")
        )
})

export { refreshAccessToken, registerUser, loginUser, logoutUser, getUser, updateUserProfilePicture }