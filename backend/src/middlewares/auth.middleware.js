import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

const verifyJWT = asyncHandler(async(req,_,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
        if(!token){
            throw new ApiError(401,"unAuthorized Access")
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken._id).select("-password -refreshToken")
        if(!user){
            throw new ApiError(401, "Invalid Access Token")
        }
        if (user.accountStatus === "suspended") {
            return res.status(403).json({
                success: false,
                message: "Your account has been suspended.",
            });
        }
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access Token")
    }
})

const verifyAdmin = asyncHandler(async(req,_,next)=>{
    const user = await User.findById(req.user?._id)
    if (!user) {
        throw new ApiError(401, "User not found")
    }
    if(user.role !== "admin"){
        throw new ApiError(403, "Unauthorized Access")
    }
    next()
})

const verifySeller = asyncHandler(async(req,_,next)=>{
    const user = await User.findById(req.user?._id)
    if (!user) {
        throw new ApiError(401, "User not found")
    }
    if(user.role !== "seller"){
        throw new ApiError(403, "Unauthorized Access")
    }
    next()
})

export {verifyJWT, verifyAdmin, verifySeller}