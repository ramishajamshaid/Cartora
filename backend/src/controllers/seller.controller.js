import { Product } from '../models/product.model.js';
import { Store } from '../models/store.model.js';
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js';


const getSellerDashboardData = asyncHandler(async(req,res)=>{
    const store = await Store.findOne({"owner": req.user._id})
    const totalProducts = await Product.countDocuments({"store": store._id})
    const recentProducts = await Product.find({"store": store._id}).sort({createdAt: -1}).limit(5);
    
    return res
        .status(200)
        .json(
            new ApiResponse(200, {stats: {totalProducts}, recentProducts:recentProducts, store:store}, "Seller dashboard data fetched successfully")
        )  
})


export {getSellerDashboardData}